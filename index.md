---
layout: default
title: Home
permalink: /
---

## Introduction

I am a software developer focused on back-end systems with experience in Python, Go, API design and implementation, security practices, and object-oriented design. My background shows a clear through-line of applying computer science concepts to solve problems in diverse domains, including education and aerospace manufacturing quality. Through my professional experience, I've developed a strong aptitude for communicating with both technical and non-technical stakeholders and translating practical problems into software solutions.

Throughout this work, I gained experience with modern testing practices using JUnit, Go's testing framework, Pytest, and Google Test (gtest). I also incorporated static analysis tools such as Cppcheck to identify defects early and reinforce secure coding practices. I also gained direct experience with Java, Gradle, Maven, and Spring Boot through several courses. One class was centered around building a mobile application purely in Java, which required extensive work with modifying the `build.gradle` file for the project; another required implementing security features and performing static analysis on a pre-built Spring Boot application; and a third required fully developing and testing a basic demo program using JUnit testing in Eclipse.

In my professional work, I've developed advanced solutions to problems as a teacher in Thailand and as a Quality Tech at Collins Aerospace in Jamestown, ND. As a teacher, I used Python to create a web app with Flask that allows teachers to store grade data and output it to the school's specified format, and at Collins Aerospace I developed numerous software solutions, some of which can be seen in the table below:

| Problem | Solution | Tools | Impacts |
|-|-|-|-|
| Document relationships are hard to track for audits | Built a document dependency graph that visualized and propagated non-compliance notifications through parent-child relationships | C#, Windows Forms | Traceability, data integrity, audit support |
| Products are being shipped with incorrect serial numbers attached, and the operators responsible can't be identified | Integrated with SAP to retrieve expected serial numbers, stored them with SQLite, and built a barcode-scanning application that logged operator changes for traceability | C++, Windows Forms, SQLite | Traceability, data integrity, asset/process tracking |
| CMM Reports are difficult to look up on the computer, making it very time consuming for inspectors to verify CMM errors | Created a shell script to open a CMM report based on various file identifiers (part number, date, and order number) in the user's text editor of choice | PowerShell, Windows Forms | Data integrity, traceability, process improvement |
| New inspectors take a long time to learn to write QNs and need reference material to work from | Created a GUI to look up QNs by part number and import the necessary data into a text file for inspectors to reference | Python, TKinter, Win32COM | Data integrity, process improvement |
| Processing document repository update reports takes several hours a week and requires excessive training for a new worker to take over | Created a Python script that processes report data and stores it in the Excel tracker | Python, Win32COM | Audit support, data integrity, process improvement |


This portfolio highlights selected academic, personal, and professional projects that demonstrate my approach to backend engineering, secure software development, and practical problem solving.

### Backend Engineering Fit


| Role Requirement | Evidence in My Work |
|-|-|
| Object-oriented programming | Java coursework, WeatherWatcher TUI component design, C#/C++/Python production tools |
| REST APIs and web services | Travlr Go API migration, WeatherAPI integration, Flask grade-reporting app |
| Relational databases and SQL | PostgreSQL schema migration in Travlr, SQLite persistence in WeatherWatcher and Collins traceability tools |
| Backend service architecture | Go backend redesign with routing, middleware, DTO validation, persistence layers, and logging |
| Java / Spring Boot exposure | Spring Boot security coursework, Java mobile app coursework, JUnit testing in Eclipse |
| Cloud and infrastructure exposure | AWS S3, AWS CLI/IAM, CloudFront, and Docker exposure through Boot.dev coursework; deployed Travlr frontend/backend using Vercel and Render |
| Testing and quality practices | JUnit, Go tests, Pytest, Google Test, Cppcheck, documented test plans |
| Version control and workflows | Git-based portfolio and project repositories, feature-branch workflow in Travlr enhancement |
| Linux and Windows environments | Windows professional tooling, Ubuntu daily driver experience, macOS personal development environment |
| Data integrity and traceability | Collins Aerospace SAP/barcode/SQLite tool, document dependency graph, audit-support automation |
| Communication and collaboration | Quality engineering stakeholder tools, teaching background, technical narratives and code review presentation |

### Featured Work

- [Travlr Getaways]({{ '/academic-projects/travlr/' | relative_url }})
- [WeatherWatcher TUI]({{ '/personal-projects/weather-watcher/' | relative_url }})

### Focus Areas

- Backend Systems 
- Database Design 
- Software Security 
- Software Testing 
- Object-Oriented Programming 
- API Development

### Supporting Coursework

- [Boot.dev Coursework]({{ '/bootdev-experience/' | relative_url }})
