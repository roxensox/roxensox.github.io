---
layout: default
title: WeatherWatcherTUI
permalink: /personal-projects/weather-watcher/
---
## WeatherWatcher TUI

### Overview

WeatherWatcher TUI is a terminal-based weather application that retrieves current weather information from WeatherAPI and presents it through a text user interface. The application persists user location preferences in SQLite and provides a menu-driven interface for configuring and switching between saved locations.

The project's github repository [can be found here.](https://github.com/roxensox/WeatherWatcherTUI)

### Tools

- Python
- SQLite
- UV
- Pytest
- curses

### Engineering Focus

I built this project to strengthen my software engineering skills across several domains, including API integration, object-oriented design, application architecture, and terminal user interface development.

#### Objective 1: Integrating with a REST API

After building several REST APIs in Go, I wanted to reinforce my understanding of HTTP by consuming an external API from a different ecosystem. Using Python's requests library, I integrated with WeatherAPI to retrieve and process live weather data, giving me experience working with third-party APIs outside the Go standard library.

#### Objective 2: Creating a Maintainable UI

While I have worked with user interfaces using Windows Forms and TKinter to create GUIs, creating a TUI is a much more involved process, especially working with a lightweight framework like curses. This allowed me to design reusable abstractions for UI elements and structure the view system around reusable components, which allowed me to dive more deeply into object-oriented design than I had before.

#### Objective 3: Delivering a Complete Application

Beyond experimenting with individual technologies, I wanted to build a complete application that solved a practical problem. This required integrating API communication, persistent storage, user interaction, configuration management, and error handling into a cohesive system rather than treating each component as an isolated exercise.

### Architecture

WeatherWatcher is organized into separate components responsible for:

- REST API integration
- Persistent storage with SQLite
- Rendering the terminal interface using `curses`
- Application state and user interaction

Together, these components retrieve, persist, and present weather data while keeping each responsibility isolated. This architecture minimizes the impact of changing data sources by confining most changes to the application's configuration and API integration layer rather than requiring modifications throughout the codebase.

### Lessons Learned

- Designing reusable UI abstractions simplifies development of dynamic TUIs.
- Separating API communication from presentation made testing and future maintenance much simpler.
- Building a complete application from scratch required much more architectural planning than isolated programming exercises or guided projects.
