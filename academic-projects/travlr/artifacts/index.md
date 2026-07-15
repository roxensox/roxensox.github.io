---
layout: default
title: Artifacts
permalink: /academic-projects/travlr/artifacts/
---

# Travlr Getaways - Artifacts

## Source Code

### Before:

The original Travlr Getaways implementation was completed as SNHU coursework and is not published publicly in its entirety in order to preserve academic integrity and course material privacy. Instead, I've included [all particularly relevant code files within this repository, viewable at this link](https://github.com/roxensox/roxensox.github.io/tree/main/academic-projects/travlr/project_code/Original_Baseline). Original source code is also reviewed in the [code review video linked here.](https://youtu.be/Ykzun9Gxig0)

### After:

[Source code for the enhanced, Go/PostgreSQL implementation of Travlr Getaways can be found here.](https://github.com/roxensox/portfolio-travlr)

## Overview

The enhanced artifact has a configurable backend server implemented in Go, with a much smaller file footprint than the original Express backend. It is also set up for production deployment, and has been deployed as a live demo at [hoveskeland-travlr.vercel.app](https://hoveskeland-travlr.vercel.app). To run in a local environment, follow the instructions in the GitHub repository's `README.md`.

In the live demo, the authentication flow can be accessed using the following credentials:

```
Name = Ryan
Email = ryan@example.com
Password = testpass123
```

In the spirit of creating a 1:1 replication of the original Travlr Getaways application, omission of any one of these credentials will result in a failed login.

## Enhancements

To view comparisons and breakdowns of the enhancements, click the following links:

- [Software engineering enhancement]({{ '/academic-projects/travlr/artifacts/endpoints' | relative_url }})
- [Database enhancement]({{ '/academic-projects/travlr/artifacts/database' | relative_url }})
- [Data Structures and Algorithms enhancement]({{ '/academic-projects/travlr/artifacts/authentication' | relative_url }})
