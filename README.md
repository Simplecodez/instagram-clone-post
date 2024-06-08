# Simple Instagram clone

## Description

This is an overly simplistic application showing basic CRUD operations using Nestjs, GraphQL and TypeORM.
Nestjs is a Nodejs framework built on top of Express.js. It makes writing modular and maintainable codes easy.
The GraphQL is a query language used as a substitute to traditional REST APIs. It gets you exactly what you requested for without over fetching. TypeORM is an ORM package that maps tables to models. It abstracts the database connection layer, tables and column creation.


## Installation
Please before you continue, ensure you have Nodejs install on your PC. If you don't have it, please visit [Download Nodejs](https://nodejs.org/en/download/package-manager) for the installation process.
Now, clone the repo:

```bash
$ git clone https://github.com/Simplecodez/instagram-clone-post
```
After that, run: "npm install" to install all the dependencies of the project.

```bash
$ npm install
```

## Running the app

For the database, PostgresQL image on docker was used for simplicity. Please ensure that you have Docker installed.
To install docker, visit: [Docker](https://docs.docker.com/get-docker/) to download. Please make ensure that Docker daemon is running before you run this command:

```bash
$ docker compose up
```
This will download  PostgresQL and Adminer images and fire up two services; a PostgresQL database on port: 5432 and Adminer, a database management tool accessible on,

```
localhost:8080
```
You will be prompted to enter your username and password of the database
Please use:

```
database: select PostgresQL 
username: postgres
password: postgres
```
and log in.

After that, run the application using:
```bash
# watch mode
$ npm run start:dev
```
This will start the App, conmect to the database and populate the Post and User entities with dummy test data 

## Usage
Once the service is started, visit the Graphql playground on your browser:
```
localhost:3000/graphql
```
to test and use the application. 
It contains documents on the various endpoints.
I implemented a very simple authentication for accessing the endpoints to make it a bit real life and so the post can be associated with a user.
The authentication can be easily deactivated by removing the:
```
@UseGuards(AuthGuard) in the PostResolver call
```
## Licence 
MIT

