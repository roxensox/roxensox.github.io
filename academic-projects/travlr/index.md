---
layout: default
title: Travlr
permalink: /academic-projects/travlr/
---

## Overview

Travlr Getaways is a full-stack project completed using the MEAN stack for my full stack development class at SNHU, CS-465. For my portfolio piece, I've migrated the back end from Express to Go and migrated the database from MongoDB to PostgreSQL. The project demonstrates REST API design, database migration, authentication, testing, and secure software development practices. Although implemented in Go, this project demonstrates backend service design patterns transferrable to Java/Spring Boot: routing, middleware, DTO validation, persistence layers, and automated testing.

## Source Code
### Original
[Original, MEAN Stack key files](https://github.com/roxensox/roxensox.github.io/tree/main/academic-projects/travlr/project_code/Original_Baseline)

### Enhanced
[Enhanced Go Implementation repository](https://github.com/roxensox/portfolio-travlr/)

## Tech Stack


| Area | Technology |
|------|------------|
| Frontend | Angular |
| Backend | Go |
| Database | PostgreSQL|
|Authentication | JWT|
|Migrations | Goose |
|Frontend Deployment | Vercel |
|Backend Deployment | Render|


## Live Demo

After completing my enhancements, I decided to use Vercel and Render to deploy the frontend and backend, respectively, for a live demo. The live demo has a working authentication workflow, allowing users to add and edit trips when authenticated. [Follow this link to visit the deployed website](https://hoveskeland-travlr.vercel.app), and use the credentials below to authenticate and edit the site:

```text
Name: Ryan
Email: ryan@example.com
Password: testpass123
```

Note that the name field is required, but can be set to any value you choose.

## Capstone Enhancements

| Software Design and Engineering | Databases | Algorithms and Data Structures / Security |
|-|-|-|
| Migrated backend from Node/Express to Go| Migrated MongoDB to PostgreSQL| Reimplemented authentication flow|
|Preserved REST API behavior| Designed relational schema| Added Argon2id password hashing|
|Improved project structure and maintainability| Added Goose migrations| Used constant-time password verification|
| | Designed database access middleware| Improved JWT handling|


## Program Outcome Alignment

| Outcome | Evidence of Achievement |
|-|-|
|Outcome 1|Code review, technical narratives, stakeholder-focused design documentation|
|Outcome 2|Professional self-assessment, GitHub Pages portfolio, code review video|
|Outcome 3|Go backend redesign, PostgreSQL migration, architectural tradeoff analysis|
|Outcome 4|Angular, Go, PostgreSQL, SQLC, Goose, testing, deployment|
|Outcome 5|Argon2id, JWT authentication, input validation, constant-time comparison|

### Course Outcome Definitions

1. **Collaborative Environments**  
   Employ strategies for building collaborative environments that enable diverse audiences to support organizational decision-making in the field of computer science.

2. **Professional Communication**  
   Design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts.

3. **Computing Solutions and Design Trade-offs**  
   Design and evaluate computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution while managing the trade-offs involved in design choices.

4. **Techniques, Skills, and Tools**  
   Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals.

5. **Security Mindset**  
   Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources.

## Capstone Code Review

<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/Ykzun9Gxig0"
    title="Capstone Code Review"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
</div>

This code review examines the original Travlr Getaways application before enhancement. The review discusses the existing functionality, analyzes architectural strengths and weaknesses, identifies opportunities for improvement, and outlines the software engineering, database, and algorithms/data structures enhancements implemented during the capstone project.
