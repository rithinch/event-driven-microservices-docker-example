# Event-Driven Microservices Backend Sample

Proof of Concept for a scalable Local News Application, based on simplified event-driven microservices architecture and Docker containers. :whale:

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rithinch_event-driven-microservices-docker-example&metric=alert_status)](https://sonarcloud.io/dashboard?id=rithinch_event-driven-microservices-docker-example)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)](https://saythanks.io/to/rithinch) 
[![HitCount](http://hits.dwyl.io/rithinch/Event-Driven-Microservices-Sample.svg)](http://hits.dwyl.io/rithinch/Event-Driven-Microservices-Sample)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## Introduction

This repo presents a proof of concept of a highly scalable local news application backend. The application was developed keeping a local news domain in mind, but the principles used can easily be applied to design software solutions for any domain. One of the primary business requirements for a local news application domain is that it has to be blazing fast since news updates are requested very often by customers and it would largely benefit the business if the system architecture can support such scale. After evaluating several different system architectures, a hybrid event-based microservices architecture was designed to meet the requirements. This approach leverages RabbitMQ message broker for events communication between the microservices and all the services are containerized using Docker such that they can independently developed, deployed, monitored and scaled.

## Full Application Backend Demo

[![Video](https://img.youtube.com/vi/F2uVu6hKZTc/0.jpg)](https://www.youtube.com/watch?v=F2uVu6hKZTc)

The following video demo shows all the currently supported features for the proof of concept. It goes through how to run the application stack and perform operations requesting the api's.

Event-based communication samples are highlighted in following two scenario's:
* When a new article is added through articles-management service, the notification service picks up that event and sends an email to the admin with the article details.
* When a new user is added through user-management service, the authentication service picks up that event and stores the login details of the user. Demonstrating Atomic Transactions in a Microservices Architecture. 

## Running the entire application stack

If you have docker-compose installed and docker running; it is really simple to spin up the entire application stack.

Make sure you are in the root directory of the repository where the docker-compose file is.

**docker-compose up** starts it and **docker-compose down** stops it

Example:

```
docker-compose build --no-cache
docker-compose up
docker-compose down
```

All the environment variables for the application need to be specified in the docker compose file, each service has environment/config.js which can used in anywhere in it's service application to get the config files for that instance. This allows to seperate environment configurations concerns from our applicaiton code meaning it can easily spun up for local, development and production environments with different db credentials, ports etc.

## Working Features

Once you run the entire application stack using docker compose, you should be able access the public routes below:

Feature | Type | Route | Access
------------ | ------------- | ------------- | -------------
Get all articles | GET | http://localhost:3000/api/articles | Public
Get a specific article | GET | http://localhost:3000/api/articles/:id | Public
Add a new article | POST | http://localhost:3000/api/articles | Protected
Update an article | PUT | http://localhost:3000/api/articles/:id | Protected
Delete an article | DELETE | http://localhost:3000/api/articles/:id | Protected
Get all events | GET | http://localhost:3001/api/events | Public
Get a specific event | GET | http://localhost:3001/api/events/:id | Public
Add a new event| POST | http://localhost:3001/api/events | Protected
Update an event | PUT | http://localhost:3001/api/events/:id | Protected
Delete an event | DELETE | http://localhost:3001/api/events/:id | Protected
Get all users | GET | http://localhost:3002/api/users | Public
Get a specific user | GET | http://localhost:3002/api/users/:id | Public
Add a new user | POST | http://localhost:3002/api/users | Protected
Update an user | PUT | http://localhost:3002/api/users/:id | Protected
Delete an user | DELETE | http://localhost:3002/api/users/:id | Protected
Authenticate a user | POST | http://localhost:3003/api/auth | Public

For protected routes: you can post to http://localhost:3003/api/auth first with the following 'body' to get the admin token

```json
{
	"emailAddress": "rithinch@gmail.com",
	"password": "Testing0*"
}
```

Then put the recieved token in the authorization header for other protected routes.

Ofcourse, now with that in place you can create new users and authenticate with their credentials next time to get a different token. :grimacing:

To add a new user send a post request to http://localhost:3002/api/users with the following json body structure and its contents:

```json
{
	"firstName": "New",
	"lastName": "User",
	"emailAddress": "newuser@new.com",
	"description": "New User",
	"password": "Testing0*"
}
```

## Event-Based Communication Between the Microservices - Example

This is where things get interesting, our microservice ecosystem consists of 5 microservices. 4 of them are public facing exposed via an api i.e articles-management, events-management, users-management and authentication. We also have an internal notification microservice (no client apps have access to this). These 5 services form our application microservice ecosystem.

None of the microservices talk to each other directly (using their api's) ... wait.. what.. then how is notification service sending an email when article-management service adds an article? :confused:

Using a Pub/Sub pattern with RabbitMQ message broker. Which means that mean a client sends a post request to article-management service; the service processes the request and after it's done, it simply publishes a message with some payload to 'article.added' exchange and completes the request.

Now within our ecosystem if any microservice is subscribed to that event it will be alerted and start to process the recieved message with payload. So in this case, our notification service is subscribed to the article.added' exchange. 

This also means that we can have multiple subscribers to that event, so article-management doesn't need to worry about who is subsrcibed it can simply publish the message finish the request. This makes our services loosely coupled and we can easily add more independent services to our ecosystem.

All our services are can be run, developed and scaled independently. :sunglasses:

### Code example:

**Publisher**:

If you see the file 'article.added.js' in services/articles-management/src/message-bus/send folder; that is being used in add method of controllers/article.controller.js and is called when the adding finishes.

**Subscriber**:

If you see the file 'article.added.js' in services/notification/src/subscriptions folder; that is called in the server.js of the file, so telling the node application to start listening to that service.

Another such event based communication is applied in this demo; when adding the user through user-management service. The responsibility of user-management service is to handle adding of users and user releated activity on the application (their likes, bookmarks) etc. The responsibility of the authentication service is to handle authentication related activites i.e assigning token if the password is valid, password reset routines etc. But users can be created only through user-management service... then how is that user record created in the authentication db? 

Simple.
.
.
**Events**. 

This allows us to handle inserting of data in two microservices from one request. Atomic Transactions are crutial for complex business domain and can be challenging when dealt within a microservices architecture. Event Sourcing patterns play a large part in microservice architecture design patterns. 

**Microservices + Events + Docker = Awesome DevOps** :bowtie:

Understanding the above concepts are the just foundations to get started with the modern trio (Microservices+Events+Docker), there is still a lot more to learn and explore when adapting such an architecture in an production environment. Especially handling issues disaster recovery challenges and monitoring.

I found the book, [Microservices Architecture from O'Reilly](https://www.oreilly.com/library/view/microservice-architecture/9781491956328/) a good read for learning about microservices concepts and how to approach about building such systems.

## Running the Unit Tests

Go to the respective service directory where the package.json is and run tests.

Eg: to run the tests for the articles-management service

```
cd services/articles-management
npm test
```

To run all the tests for all microservices, a script 'run_all_tests' has been created in the root directory.

```
./run_all_tests
```

## Running the linter

Go to the respective service directory where the package.json is and run linter.

Eg: to run the tests for the articles-management service

```
cd services/articles-management
npm run lint
```

All services have adopted the eslint airbnb configuration. A strict linting policy has been followed to ensure consistent code is produced.
