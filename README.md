# A TypeScript/Maven Example Project

A Maven project that demonstrates how a JavaScript library can be built from TypeScript and integrated into a Webapp project.


This project consists of these modules
*  example-library-js: A module that exposes an example javascript library
**  Written in TypeScript and compiled to JavaScript via [Grunt](http://gruntjs.com/) and the [Grunt Maven Plugin](https://github.com/allegro/grunt-maven-plugin)
**  Contains a Jasmine(http://pivotal.github.io/jasmine/) based unit test as well as a code coverage report
**  Packaged as a [WebJAR](http://www.webjars.org/)
*  example-webapp: An example webapp module that uses the javascript library
**  Integrates the library via [RequireJS](http://requirejs.org)
**  Packaged as a WAR

# Prepare
*  Install [Maven](http://maven.apache.org/)
*  Install [NodeJS](http://nodejs.org/)

## Build and Run

*  `mvn install`
*  `cd example-webapp`
*  `mvn jetty:run`
*  Open `http://localhost:8080`





