---
layout: default
title: Travlr
---

# Software Engineering Enhancement

## Overview

This artifact is the architecture of the CS465 final project, Travlr Getaways, a simple full-stack travel site with an SPA interface and CRUD functionality. I originally implemented this project using the MEAN stack. For this enhancement, I reimplemented the back-end architecture in Go while preserving compatibility with the existing Angular front end.

I included this artifact in my ePortfolio because I think full-stack development is one of the best ways to demonstrate a holistic understanding of software engineering principles and best practices with a functional product. The larger-scale design of a back-end server provides a good opportunity to demonstrate macro-level design skills, while designing the behavior of endpoint methods provides opportunities to demonstrate micro-level design skills.

## Original Design

The original implementation used the MEAN stack, with Express handling routing and business logic and MongoDB serving as the database layer. While the original implementation was functional, it relied heavily on Javascript and a relatively large collection of dependencies. Because Javascript is weakly typed, data could often pass between components without explicit validation or conversion, which simplified development but also obscured some implementation details.

## Enhancement

The primary enhancement was the reimplementation of the REST API in Go. My goal was not to add major new functionality, but to recreate the existing functionality using a simpler and more maintainable architecture. The new implementation includes endpoint handling, JSON response generation, logging, and separation between handler and database-access logic.

I am particularly proud of my implementation of the `/trips` endpoint. During development, this endpoint simulated database responses while the database layer was still being implemented, allowing me to test communication between the Angular front end and the Go back end independently.

## Software Engineering Principles

I think the artifact has been improved in two major ways, both of which ultimately boil down to simplicity. First, the structure of the back end is much simpler and more straightforward in the Go implementation. Second, there are far fewer dependencies to track and maintain.

Some smaller improvements include stronger typing through Go, more thorough documentation through comments, better error handling, and improved logging. Separating endpoint handlers from database-access logic also makes the application easier to maintain and extend because responsibilities are more clearly defined.

One of the most interesting lessons from this enhancement involved the tradeoffs between weakly typed and strongly typed systems. In the Express implementation, the `perPerson` attribute was stored as a string, and Angular accepted that value without issue, interpreting it as a numeric value when necessary. I initially designed my Go `Trips` type to store the same attribute as a string, but Angular failed to render it correctly until I changed it to a numeric type.

In the end, my solution to preserve compatibility was to create a custom type capable of accepting either strings or integers during JSON unmarshaling, and use that to hold `perPerson` values.

```go
type IntString string

func (f *IntString) UnmarshalJSON(data []byte) error {
	var s string
	if err := json.Unmarshal(data, &s); err == nil {
		*f = IntString(s)
		return nil
	}

	var n int
	if err := json.Unmarshal(data, &n); err == nil {
		*f = IntString(strconv.Itoa(n))
		return nil
	}

	return fmt.Errorf("Value must be a string or number")
}
```

Once I decided to address the type mismatch directly, I also added validation at the API level to ensure incoming requests contained valid data before entering the rest of the application, and to reshape them for use if so. This included validating date formats and ensuring that numeric values were within acceptable ranges.

```go
func ValidateTripRequest(trip RequestTrip) (ResponseTrip, time.Time, error) {
	validStart, err := DateFromString(trip.Start)
	if err != nil {
		log.Println("Invalid date format.")
		return ResponseTrip{}, time.Time{}, err
	}

	validPerPerson, err := strconv.Atoi(string(trip.PerPerson))
	if err != nil {
		log.Println("Invalid per-person value.")
		return ResponseTrip{}, time.Time{}, err
	}

	if validPerPerson <= 0 || validPerPerson > math.MaxInt32 {
		return ResponseTrip{}, time.Time{}, fmt.Errorf("Per-person value must be between 1 and %d", math.MaxInt32)
	}
```

I see this as a decision about when to deal with complexity in a system. Weakly typed systems often allow those details to be deferred, while strongly typed systems force developers to address them earlier in the development process. Although this can require more work upfront, I believe it improves maintainability and reduces ambiguity in the long run. This mindset also fits very well with the Go development paradigm; dealing with implementation problems at their source prevents the codebase from gaining unnecessary complexity.


## Challenges and Problem Solving

One challenge throughout this enhancement was maintaining compatibility with the existing Angular application while replacing the entire back-end implementation. Because the front end was designed to communicate with an Express server, I needed to carefully compare responses between the two implementations and ensure that the Go API produced data in the format Angular expected. To accomplish this, I created a response transformation layer that converted internal data structures into the exact shape expected by the Angular client.

```go
trips_array := []ResponseTrip{
	{
		Code:        trip.Code,
		Name:        trip.Name,
		Length:      trip.Length,
		Start:       startString,
		Resort:      trip.Resort,
		PerPerson:   trip.Perperson,
		Image:       trip.Image,
		Description: trip.Description,
	},
}
```

This required extensive testing using the web browser, Postman, logging output, and git branches to isolate and troubleshoot issues. Working with an existing codebase and replicating its functionality proved to be a very different experience from developing a project entirely from scratch.

## Course Outcomes Addressed

With this enhancement, I had planned to satisfy <span tabindex="0" class="tooltip">outcome 1<span class="tooltip-text">Collaborative environments and communication.</span></span>, <span tabindex="0" class="tooltip">outcome 3<span class="tooltip-text">Design and evaluate computing solutions that solve a given problem using algorithmic principles.</span></span>, and <span tabindex="0" class="tooltip">outcome 4<span class="tooltip-text">Use well-founded and innovative techniques, skills and tools to implement solutions.</span></span>. This enhancement satisfies <span tabindex="0" class="tooltip">outcome 1<span class="tooltip-text">Collaborative environments and communication.</span></span> by the extensive use of Git feature branches and version control to separate features-in-work from the main branch, maintaining the working state of the project while the new version is under construction and allowing other developers to see the current state of the project and join in development if they would like to. This enhancement also satisfies <span tabindex="0" class="tooltip">outcome 3<span class="tooltip-text">Design and evaluate computing solutions that solve a given problem using algorithmic principles.</span></span> through the overall migration from JavaScript to Go, which required weighing the pros and cons of breaking the MEAN ecosystem and handling compatibility issues during development. Finally, this enhancement satisfies <span tabindex="0" class="tooltip">outcome 4<span class="tooltip-text">Use well-founded and innovative techniques, skills and tools to implement solutions.</span></span> through the use of Goose, SQLC, Go standard library packages like `net/http`; all technologies commonly used in professional Go development.

## Reflection

Enhancing this artifact has been a lot of fun and a great learning experience. While I had previous experience developing REST APIs in Go, working with an existing codebase, replicating its functionality, and debugging interactions between multiple system components made this project feel much closer to professional software development than many of my previous assignments.

Converting a project from a homogeneous Javascript ecosystem to a separate language also highlighted some of the quirks involved in processing external data. The experience reinforced the importance of clear interfaces, strong typing, and careful testing when integrating systems built with different technologies. Overall, I believe this enhancement demonstrates growth in software design, system integration, debugging, and maintainability, all of which are important skills for a back-end software engineer. It also reinforced my interest in backend development, where careful interface design and system integration usually matter more than any individual technology choice.
