---
layout: default
title: Database
---

# Databases Enhancement - MongoDB to PostgreSQL

## Source Code

The SQL schema and queries can be found in [`/go_server/sql`](https://github.com/roxensox/portfolio-travlr/tree/main/go_server/sql).

## Schema

To complete this enhancement, I had to create a relational database schema that stored data in a format compatible with the existing Angular front end, while also complying with Go's strong typing. Because number fields are handled as text in many cases in the original implementation, I had to convert the received numeric strings to integers in the PostgreSQL implementation by validating that the received strings are numeric before attempting to store them. See the schema below for reference.

![travlr database schema](/assets/images/TravlrDatabaseSchema.png)

## Data Validation

To validate requests from the frontend for database writes, I created a helper function in the Go code that prepares the received data for backend use. Specifically, it converts the received string value for the trip start date to a timestamp and ensures that the received `perPerson` string value is numeric in order to store it in the database. See the snippet below for the validation function.

```go
// ValidateTripRequest converts the Angular request DTO into a frontend-ready
// response DTO and a parsed date value for database writes.
func ValidateTripRequest(trip RequestTrip) (ResponseTrip, time.Time, error) {
	validStart, err := DateFromString(trip.Start)
	if err != nil {
		log.Println("Invalid date format.")
		return ResponseTrip{}, time.Time{}, err
	}
	startString := validStart.Format("2006-01-02")

	validPerPerson, err := strconv.Atoi(string(trip.PerPerson))
	if err != nil {
		log.Println("Invalid per-person value.")
		return ResponseTrip{}, time.Time{}, err
	}
	if validPerPerson <= 0 || validPerPerson > math.MaxInt32 {
		log.Println("Invalid per-person value.")
		return ResponseTrip{}, time.Time{}, fmt.Errorf("Per-person value must be between 1 and %d", math.MaxInt32)
	}

	// After validation, Start is safe to return as an HTML date string, and
	// PerPerson is safe to narrow for the sqlc trip model.
	outTrip := ResponseTrip{
		Code:        trip.Code,
		Name:        trip.Name,
		Length:      trip.Length,
		Start:       startString,
		Resort:      trip.Resort,
		PerPerson:   int32(validPerPerson),
		Image:       trip.Image,
		Description: trip.Description,
	}

	return outTrip, validStart, nil
}
```

## Migration Structure

I used the migration tool, Goose, to implement database migrations for this enhancement, as well as SQLC to generate code from SQL queries. This allowed me to make clean migrations throughout the project, creating the database in an iterative workflow. SQLC also ensured consistency in the database access layer, and together, Goose and SQLC support maintainability and reproducibility in external environments.

## What Improved

This enhancement improved the artifact by:

- Creating a maintainable database schema
- Allowing extensible database functionality
- Improving data shape consistency
- Separating the database from other backend concerns
- Supporting better data validation
