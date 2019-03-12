# URL Shortener
A web application for generating short URLs with redirection support.


### Requirements
#### Development
- make
- Node.js (10.15.x)
- npm
- Yarn
- Postgres (11.2)

#### Production
- make
- Docker
- Docker Compose (compose file version 3.x)


### Commands
Set up development environment:

    make bootstrap-dev
Verify code style:

    make lint
Run development server*:

    make run
Run live-reloading development server*:

    make run-reload
Run production server:

    make deploy
Remove production server:

    make teardown

\* Please, make sure to have Postgres running before attempting to run the development server.


### Usage
Open `http://localhost:3000` in browser to access development server.

Open `http://localhost` in browser to access production server.


### Note
The Makefile contains the values of environment variables for demonstration purposes only.

The values of the environment variables would normally be passed on to the Makefile via the CLI (in development environment) or an environment orchestrator (in production environment).


### TODO
- Add an integration test (end-to-end test to validate short URL generation and redirection).
- Support different configurations for different environments (create multiple config files).
- Explore the usage of an HTTP/2 server (Express doesn't support it yet, try other frameworks).
- Support the editing of existing short URLs (add `PUT` `/urls` endpoint, index long URLs in database, use update by long URL query on database).
- Cache frequently used short URLs (store the long URL of every first request to `GET` `/urls/:urlId`, return the long URL from cache for subsequent requests to `GET` `/urls/urlId`, expire the cache entries when they're edited via `PUT` `/urls`).
