---
layout: default
title: Artifacts
---

# Travlr Getaways - Artifacts

## Source Code

### Before:

The original Travlr Getaways implementation was completed as SNHU coursework and is not published publicly to preserve academic integrity and course material privacy. Instead, I've included code snippets in the comparisons and breakdowns to illustrate the biggest differences between the original and enhanced implementations. Original source code is also reviewed in the [code review video linked here.](https://youtu.be/Ykzun9Gxig0)

### After:

[Source code for the enhanced, Go/PostgreSQL implementation of Travlr Getaways can be found here.](https://github.com/roxensox/portfolio-travlr)

## Overview

The enhanced artifact has a configurable backend server implemented in Go, with a much smaller file footprint than the original Express backend. It is also set up for production deployment, and has been deployed as a live demo at [https://hoveskeland-travlr.vercel.app](hoveskeland-travlr.vercel.app). To run in a local environment, follow the instructions in the GitHub repository's `README.md`.

In the live demo, the authentication flow can be accessed using the following credentials:

```
Name = Ryan
Email = ryan@example.com
Password = testpass123
```

In the spirit of creating a 1:1 replication of the original Travlr Getaways application, omission of any one of these credentials will result in a failed login.

## Enhancements

To view comparisons and breakdowns of the enhancements, click the following links:

- [Software engineering enhancement](https://roxensox.github.io/travlr/artifacts/endpoints)
- [Database enhancement](https://roxensox.github.io/travlr/artifacts/database)
- [Data Structures and Algorithms enhancement](https://roxensox.github.io/travlr/artifacts/authentication)
