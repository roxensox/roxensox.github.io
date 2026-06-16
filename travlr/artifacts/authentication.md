---
layout: default
title: Travlr
---

# Algorithms and Data Structures Enhancement - Authentication Workflow

## Source Code

Enhanced authentication code can be found in [`/go_server/internal/auth/password.go`](https://github.com/roxensox/portfolio-travlr/blob/main/go_server/internal/auth/password.go), [`/go_server/internal/auth/jwt.go`](https://github.com/roxensox/portfolio-travlr/blob/main/go_server/internal/auth/jwt.go), [`/go_server/internal/api/auth.go`](https://github.com/roxensox/portfolio-travlr/blob/main/go_server/internal/api/auth.go), and [`/go_server/internal/api/auth_middleware.go`](https://github.com/roxensox/portfolio-travlr/blob/main/go_server/internal/api/auth_middleware.go).

## Password Hashing

In this enhancement, I used the Argon2id password hashing algorithm to hash passwords for secure storage in the database. In the original implementation, passwords were hashed using PBKDF2-HMAC-SHA512, which is substantially less resistent to modern password-cracking attacks than properly implemented Argon2id hashing, but much simpler to implement. See the snippet below for the password hashing technique used in the Express implementation.

```javascript
userSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;
}
```

While this implementation was good for a test environment, the Argon2id is much stronger specifically for hashing passwords. Argon2id hashing is much more complicated to implement because it involves substantially more variables, but hashes are returned as strings which contain all the data necessary to validate passwords later, allowing the `VerifyPassword` function to stay relatively simple. See the snippet below for the enhanced password hashing flow.

```go
// HashPassword derives an encoded Argon2id password hash suitable for storage
// in the users table. The encoded value includes the salt and work factors
// needed to verify the password later.
func HashPassword(password string) (hash string, err error) {
	saltBytes := make([]byte, 16)
	if _, err := rand.Read(saltBytes); err != nil {
		return "", err
	}

	hashBytes := argon2.IDKey([]byte(password), saltBytes, 3, 64*1024, 4, 32)

	hash = fmt.Sprintf("$argon2id$v=%d$m=%d,t=%d,p=%d$%s$%s",
		argon2.Version, 64*1024, 3, 4,
		base64.RawStdEncoding.EncodeToString(saltBytes),
		base64.RawStdEncoding.EncodeToString(hashBytes))

	return hash, nil
}

// VerifyPassword parses an encoded Argon2id hash and compares it with a hash
// derived from the submitted password using constant-time comparison.
func VerifyPassword(password, hash string) (bool, error) {
	parts := strings.Split(hash, "$")
	if len(parts) != 6 || parts[1] != "argon2id" {
		return false, fmt.Errorf("invalid hash format")
	}

	var memory, timeCost, parallelism int
	fmt.Sscanf(parts[3], "m=%d,t=%d,p=%d", &memory, &timeCost, &parallelism)

	salt, err := base64.RawStdEncoding.DecodeString(parts[4])
	if err != nil {
		return false, err
	}

	storedHash, err := base64.RawStdEncoding.DecodeString(parts[5])
	if err != nil {
		return false, err
	}

	computedHash := argon2.IDKey([]byte(password), salt, uint32(timeCost), uint32(memory), uint8(parallelism), uint32(len(storedHash)))

	return subtle.ConstantTimeCompare(storedHash, computedHash) == 1, nil
}
```

Notably, the Go implementation prevents attackers from inferring the hash through repeated attempts by validating passwords in constant time.

## Stateful JWTs

Another change with this enhancement was the introduction of stateful JWTs. In the original implementation, JWTs were issued to authenticated users with a 1-hour expiration, but there was no record of JWTs in the database, so token management was much less robust. See the JWT flow in the snippets below.

```javascript
userSchema.methods.generateJWT = function() {
	return jwt.sign(
	{ // Payload for our JSON Web Token
		_id: this._id,
		email: this.email,
		name: this.name,
	},
	process.env.JWT_SECRET, // SECRET stored in .env file
	{ expiresIn: '1h' });
};
```

```javascript
const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
	if (err) {
		// console.log("Invalid token");
		return res.sendStatus(401).json('Token validation error');
	}
	req.auth = verified; // Set the auth param to the decoded object
});
```

In the Go backend, JWTs are generated, hashed, and stored in the database with an expiration time, revocation status, and associated user ID. This change enables stronger token control than the previous implementation by allowing tokens to be revoked before the time limit and allowing rejection of tokens presented by users not associated with the token. See the enhanced JWT flow in the snippet below.

```go
// GenerateToken creates an RSA-signed JWT for the authenticated user.
func GenerateToken(userID uuid.UUID, privateKey *rsa.PrivateKey, expiresIn time.Duration) (string, error) {
	if privateKey == nil {
		return "", fmt.Errorf("Private key cannot be nil")
	}

	issuedAt := jwt.NumericDate{
		Time: time.Now().UTC(),
	}
	expiresAt := jwt.NumericDate{
		Time: time.Now().UTC().Add(expiresIn),
	}

	claims := jwt.RegisteredClaims{
		Issuer:    "travlr getaways",
		IssuedAt:  &issuedAt,
		ExpiresAt: &expiresAt,
		Subject:   userID.String(),
	}

	newJWT := jwt.NewWithClaims(
		jwt.SigningMethodRS256,
		claims,
	)

	JWT, err := newJWT.SignedString(privateKey)
	if err != nil {
		return "", err
	}

	return JWT, nil
}

// HashToken creates a deterministic lookup value for stateful JWT storage.
// The raw bearer token is never stored in PostgreSQL.
func HashToken(token string) string {
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
}

// ValidateToken verifies the token signature and registered claims using the
// RSA public key. Database-backed revocation checks happen in middleware.
func ValidateToken(tokenString string, publicKey *rsa.PublicKey) (jwt.MapClaims, error) {
	if publicKey == nil {
		return nil, fmt.Errorf("publicKey cannot be nil")
	}

	claims := jwt.MapClaims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (any, error) {
		// Reject algorithm confusion: this API issues only RS256 tokens.
		if token.Method != jwt.SigningMethodRS256 {
			return nil, fmt.Errorf("Unexpected signing method: %s", token.Header["alg"])
		}
		return publicKey, nil
	})
	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, fmt.Errorf("Invalid token")
	}

	return claims, nil
}
```

The enhanced implementation also uses RSA256 keypairs to sign tokens, virtually guaranteeing token integrity and greatly strengthening security.

## JWTs and RS256

I chose to use RS256 to strengthen JWT security because it supports a scalable and maintainable architecture for this project. The original implementation used a shared-secret approach to signing JWTs, but that approach loses its effectiveness if the token generation service moves from the server to an external service. In the current implementation, the server performs both activities, but using RS256 enables the potential for expanding the project while maintaining robust security and demonstrates production-oriented design and authentication practices.

## What Improved

This enhancement improved the artifact by:

- Hardening password hashing against attackers
- Expanding statefulness of JWTs
- Improving JWT integrity
- Preparing the project for future enhancements
