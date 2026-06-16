---
layout: default
title: DSA
---

# Security Enhancement

## Overview

This artifact is the authentication flow of the CS465 final project, Travlr Getaways, reimplemented in Go using the Argon2id hashing algorithm for password storage and verification. I originally worked on the MEAN stack implementation of this project and chose to enhance the authentication system as part of my capstone project.

I included this artifact in my ePortfolio because security and authentication flows are excellent ways to showcase attention to detail and understanding of security principles. There are many industry-standard approaches to implementing robust authentication systems, and different languages support different techniques better architecturally. Migrating this system from a pure Javascript stack to Go provided an opportunity to explore those tradeoffs while improving the overall security of the application.

## Original Design

The original implementation relied on the authentication architecture provided by the MEAN stack version of the application. While it was functional, it did not take advantage of some of the security features and libraries available within Go’s ecosystem. As part of this enhancement, I redesigned the authentication flow with a focus on secure password handling, token-based authentication, and protection against common attack vectors.

## Security Enhancements

The most significant enhancement was the adoption of Argon2id for password hashing. Argon2id is a modern password hashing algorithm specifically designed to resist brute-force attacks and hardware-assisted cracking attempts. One advantage of this approach is that the generated hash contains the salt information, making it unnecessary to store a separate salt value within the database. This simplified the database design while also improving security.

```go
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
```

Another improvement was the use of Go’s ConstantTimeCompare function during password verification. Traditional string comparisons may reveal information through execution timing differences, potentially allowing attackers to infer details about stored credentials. Using constant-time comparison removes this attack vector by making sure that comparisons take the same amount of time regardless of how much of the input matches.

```go
func VerifyPassword(password, hash string) (bool, error) {
	parts := strings.Split(hash, "$")
	if len(parts) != 6 || parts[1] != "argon2id" {
		return false, fmt.Errorf("invalid hash format")
	}

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

I also took care to strip sensitive information from user data before returning responses to the client. While seemingly small, measures like this contribute to a defense-in-depth approach where multiple layers of protection work together to reduce risk.

In addition to password security, the authentication system was expanded to support stateful JSON Web Tokens (JWTs) and middleware responsible for protecting authenticated routes. This allowed the application to verify user identity consistently across requests while maintaining centralized control over authentication and authorization behavior.

To support token revocation and expiration, JWTs are stored in the database as hashed values alongside their associated metadata.

```go
tokenHash := auth.HashToken(token)

tokenGenParams := database.CreateJWTParams{
	ID:         uuid.New(),
	UserID:     storedUser.ID,
	TokenHash:  tokenHash,
	Expiration: expiration,
	Revoked:    sql.NullTime{Valid: false},
	Created:    time.Now().UTC(),
}

_, err = cfg.DBConn.CreateJWT(req.Context(), tokenGenParams)
```

## Challenges and Tradeoffs

One of the most interesting aspects of this enhancement was the amount of research required to implement Argon2id correctly. Compared to simpler approaches such as SHA-256 hashing, Argon2id requires more configuration and a deeper understanding of password security concepts. The resulting security benefits are significant, but the implementation effort highlighted the constant tradeoff between development speed and robustness.

Another challenge involved working with sqlc-generated database code. Because sqlc regenerates database models whenever queries change, maintaining JSON struct tags directly within generated code quickly became impractical. At first, I was annoyed by this, but I eventually realized that defining dedicated Data Transfer Objects (DTOs) was actually a cleaner and more practical architectural approach. Separating database models from API response structures creates a stronger boundary between layers of the application and improves long-term maintainability.

## Testing and Validation

This enhancement reinforced the importance of testing security-critical code. Functions such as HashPassword and VerifyPassword are ideal candidates for automated testing because even small implementation errors can have significant consequences.

I began building a test suite around these functions and used the experience as an opportunity to explore test-driven development practices. Security-sensitive functionality benefits greatly from automated testing because it provides confidence that edge cases, invalid inputs, and future code changes do not compromise expected behavior.

One of the functions that I ended up testing the most in-depth was the ValidateToken function. This function is crucial to the security of the authentication flow and provided a good opportunity to build a comprehensive test matrix covering both valid and invalid authentication scenarios.

```go
func TestValidateToken(t *testing.T) {
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		t.Fatalf("Failed to generate test RSA key: %v", err)
	}

	otherPrivateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		t.Fatalf("Failed to generate second test RSA key: %v", err)
	}

	userID := uuid.New()

	validToken, err := auth.GenerateToken(userID, privateKey, time.Hour)
	if err != nil {
		t.Fatalf("GenerateToken returned error: %v", err)
	}

	wrongKeyToken, err := auth.GenerateToken(userID, otherPrivateKey, time.Hour)
	if err != nil {
		t.Fatalf("GenerateToken returned error: %v", err)
	}

	expiredToken, err := auth.GenerateToken(userID, privateKey, -time.Hour)
	if err != nil {
		t.Fatalf("GenerateToken returned error: %v", err)
	}
}
```


```go
tests := []struct {
	name      string
	token     string
	publicKey *rsa.PublicKey
	wantError bool
}{
	{
		name:      "Valid token",
		token:     validToken,
		publicKey: &privateKey.PublicKey,
		wantError: false,
	},
	{
		name:      "Token signed by different key",
		token:     wrongKeyToken,
		publicKey: &privateKey.PublicKey,
		wantError: true,
	},
	{
		name:      "Expired token",
		token:     expiredToken,
		publicKey: &privateKey.PublicKey,
		wantError: true,
	},
	{
		name:      "Malformed token",
		token:     "Totally valid token",
		publicKey: &privateKey.PublicKey,
		wantError: true,
	},
}
```

## Course Outcomes Addressed

With this enhancement, I set out to achieve <span tabindex="0" class="tooltip">outcome 3<span class="tooltip-text">Design and evaluate computing solutions that solve a given problem using algorithmic principles.</span></span> and <span tabindex="0" class="tooltip">outcome 4<span class="tooltip-text">Use well-founded and innovative techniques, skills and tools to implement solutions.</span></span>. The final enhancement demonstrates that I have accomplished <span tabindex="0" class="tooltip">outcome 3<span class="tooltip-text">Design and evaluate computing solutions that solve a given problem using algorithmic principles.</span></span> by comparing two security features of the original implementation with other security options, assessing the tradeoffs, and implementing the new feature, handling all logistical issues in the process. The enhancement also demonstrates that I have accomplished <span tabindex="0" class="tooltip">outcome 5<span class="tooltip-text">Develop a security mindset and design against adversarial behavior.</span></span> by focusing squarely on security features and improving the authentication and session workflows to promote stronger security.

## Reflection

Enhancing this artifact was challenging but extremely rewarding. Authentication systems involve a lot of moving pieces, and small implementation details often have a big impact on the overall security of an application. Working through password hashing, token management, data serialization, and testing reinforced the importance of careful design and thorough validation when developing security-sensitive software.

One of the biggest lessons I learned was that seemingly minor implementation details matter. Using Argon2id, employing constant-time comparisons, removing sensitive information from responses, and building automated tests are all relatively small decisions individually, but together they contribute to a significantly stronger security posture. This enhancement strengthened both my understanding of secure software development practices and my ability to implement them in a production-oriented application.
