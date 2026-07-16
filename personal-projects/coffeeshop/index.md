---
layout: default
title: CoffeeShop
permalink: /personal-projects/coffeeshop/
---
## CoffeeShop

### Overview

CoffeeShop is a web application designed to help coffee shops with complex menu items display and modify their menus. This project is currently in early development, and is intended to work as a reusable template for small coffee shops to host their own websites.

The project's GitHub repository [can be found here.](https://github.com/roxensox/CoffeeShop)

### Current Status

The project currently supports creating and listing beverages and ingredients through Spring Boot REST endpoints, with H2 persistence during early development and an Angular interface for interacting with the API.

### Tools

- Java
- Spring Boot
- JUnit
- JaCoCo
- Angular

### Engineering Focus

This project is focused on building a Java/Spring Boot backend around a realistic product domain. The current implementation focuses on REST endpoint design, DTO boundaries, JPA persistence, domain modeling, validation, and automated testing. The Angular front end provides a lightweight interface for exercising the API while I maintain a stronger focus on the back end.

### Architecture

CoffeeShop is organized into separate components responsible for:

- Defining data transfer objects
- Persistent storage with H2
- Exposing API endpoints through simple front end components
- Performing business logic operations on stored data
