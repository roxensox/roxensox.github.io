---
layout: default
title: Travlr
permalink: /travlr/
---

## Overview

Travlr Getaways is a full-stack project completed using the MEAN stack for my full stack development class at SNHU, CS-465. For my portfolio piece, I've migrated the back end from Express to Go and migrated the database from MongoDB to PostgreSQL. The project demonstrates REST API design, database migration, authentication, testing, and secure software development practices.

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
