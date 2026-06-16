# Software Engineering Enhancement - REST API Endpoints

## Routes

Endpoint routes are defined in [`/go_server/main.go`](https://github.com/roxensox/portfolio-travlr/blob/main/go_server/main.go), and fully replicate the set of endpoints and methods in the original MEAN implementation.

Here is the original implementation of the API routes in the MEAN stack, before enhancement:

```
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

router
	.route('/trips')
	.get(tripsController.tripsList)         // GET method routes tripList
        .post(authenticateJWT, tripsController.tripsAddTrip);     // POST method adds a trip

router
	.route('/trips/:tripCode')		// GET method routes a single trip
	.get(tripsController.tripsFindByCode) 	// Requires parameter
        .put(authenticateJWT, tripsController.tripsUpdateTrip);  // PUT method updates a trip

function authenticateJWT(req, res, next) {
	const authHeader = req.headers['authorization'];
	
	if (authHeader == null) {
		console.log('Auth Header required but not present.');
		return res.sendStatus(401);
	}
	
	let headers = authHeader.split(' ');
	if (headers.length < 1) {
		console.log('Not enough tokens in Auth Header: ' + headers.length);
		return res.sendStatus(501);
	}
	
	const token = authHeader.split(' ')[1];

	if (token == null) {
		console.log('Null Bearer Token');
		return res.sendStatus(401);
	}

	const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
		if (err) {
			return res.sendStatus(401).json('Token validation error');
		}
		req.auth = verified; // Set the auth param to the decoded object
	});
	next();
}
```

And here is the Go version, after enhancement:

```
// Trip reads remain public, while trip writes require JWT middleware.
sMux.HandleFunc("GET /api/trips", cfg.GETTrips)
sMux.HandleFunc("POST /api/trips", cfg.RequireAuth(cfg.POSTTrips))

// The path parameter is a trip code preserved from the original Express API.
sMux.HandleFunc("GET /api/trips/{tripCode}", cfg.GETTripsID)
sMux.HandleFunc("PUT /api/trips/{tripCode}", cfg.RequireAuth(cfg.PUTTripsID))

// Auth endpoints issue JWTs and intentionally stay unprotected.
sMux.HandleFunc("POST /api/register", cfg.Register)
sMux.HandleFunc("POST /api/login", cfg.Login)
```

The Go version is clearly much more explicit about middleware composition, supporting a maintainable design. It incorporates the authentication layer much more simply than the Express backend did.

## Behavior

In contrast, the original implementation of the application had much simpler definitions for backend behavior due to the homogeneity of the MEAN stack. Because all data items were native JSON, no considerations needed to be made for data shape, while the Go implementation had to decode and marshal data between Go structs and JSON data; however, the extra complication in the Go implementation provided opportunities to validate data and improve security. The code snippets below include the API method definitions for the `/trips` endpoint:

```
// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTTP status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
  const q = await Model
    .find({}) // No filter, return all records
    .exec();
  if(!q) {
    return res
    .status(404)
    .json(err);
  } else {
    return res
    .status(200)
    .json(q);
  }
};

const tripsAddTrip = async(req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });
  
  const q = await newTrip.save();
    if(!q) {
      err: Error;
      return res
        .status(400)
        .json(err);
    } else {
      return res
        .status(201)
        .json(q);
    }
}
```

Go version:

```
// GETTrips handles the public trip listing endpoint used by the Angular app.
// It reads all trip records, maps database dates into HTML date strings, and
// returns the frontend-compatible trip list as JSON.
func (cfg *ApiConfig) GETTrips(writer http.ResponseWriter, req *http.Request) {
	trips, err := cfg.DBConn.GetTrips(req.Context())
	if err != nil {
		log.Println("Failed to get trips list for GET request at /trips")
		http.Error(writer, "Failed to get trips list", http.StatusInternalServerError)
		return
	}

	tripsFormatted := []ResponseTrip{}

	for _, trip := range trips {
		curr_trip := ResponseTrip{
			Code:        trip.Code,
			Name:        trip.Name,
			Length:      trip.Length,
			Start:       trip.Start.Format("2006-01-02"),
			Resort:      trip.Resort,
			PerPerson:   trip.Perperson,
			Image:       trip.Image,
			Description: trip.Description,
		}
		tripsFormatted = append(tripsFormatted, curr_trip)
	}

	jsonTrips, err := json.Marshal(tripsFormatted)
	if err != nil {
		log.Println("Failed to marshal trips list to JSON for GET request at /trips")
		http.Error(writer, "Failed to process trips list", http.StatusInternalServerError)
		return
	}

	log.Println("Served GET request at /trips successfully")
	writer.WriteHeader(200)
	writer.Write(jsonTrips)
}

// POSTTrips handles authenticated trip creation from the Angular add-trip form.
// Validation keeps the JSON response frontend-compatible while also producing
// parsed values for the PostgreSQL insert.
func (cfg *ApiConfig) POSTTrips(writer http.ResponseWriter, req *http.Request) {
	rcv := RequestTrip{}
	decoder := json.NewDecoder(req.Body)
	err := decoder.Decode(&rcv)
	if err != nil {
		log.Println("Failed to decode json from request")
		http.Error(writer, "Failed to decode request.", http.StatusBadRequest)
		return
	}

	validTrip, startTime, err := ValidateTripRequest(rcv)
	if err != nil {
		log.Println("Failed to validate trip.")
		http.Error(writer, "Failed to add trip.", http.StatusBadRequest)
		return
	}

	newTripParams := database.CreateTripParams{
		Code:        validTrip.Code,
		Name:        validTrip.Name,
		Length:      validTrip.Length,
		Start:       startTime,
		Resort:      validTrip.Resort,
		Perperson:   validTrip.PerPerson,
		Image:       validTrip.Image,
		Description: validTrip.Description,
	}

	_, err = cfg.DBConn.CreateTrip(req.Context(), newTripParams)
	if err != nil {
		log.Println("Failed to add trip to database")
		http.Error(writer, "Failed to add trip.", http.StatusInternalServerError)
		return
	}

	jsonTrip, err := json.Marshal(validTrip)
	if err != nil {
		log.Println("Failed to marshal new trip to JSON")
		http.Error(writer, "Trip added successfully, but failed to marshal response to JSON.", http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(200)
	writer.Write(jsonTrip)
}
```

It is worth noting that errors were handled much more granularly in the Go version than in the Express version, which allowed a robust backend logging system to emerge.

## What Improved

This enhancement improved the artifact by:

- Preserving the original API contract used by the Angular frontend
- Moving route definitions into Go's standard HTTP routing model
- Applying authentication middleware directly to protected routes
- Adding explicit JSON decoding and marshaling
- Adding validation before database writes
- Improving error handling and backend logging
