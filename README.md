[![Build Status](https://travis-ci.org/hustlaviola/EPIC-mail.svg?branch=develop)](https://travis-ci.org/hustlaviola/EPIC-mail)
[![Coverage Status](https://coveralls.io/repos/github/hustlaviola/EPIC-mail/badge.svg?branch=develop)](https://coveralls.io/github/hustlaviola/EPIC-mail?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/6c6018f23546565ef4df/maintainability)](https://codeclimate.com/github/hustlaviola/EPIC-mail/maintainability)

# EPIC-mail

Ever since the invention of electronic mail by Ray Tomlinson , emails have grown to become the primary
medium of exchanging information over the internet between two or more people, until the advent of Instant
Messaging (IM) Apps.
EPIC- mail helps people exchange messages/information over the internet.

### Features

* User can create account
* User can sign in
* User can get all received emails 
* User can get all unread emails
* User can get all emails sent by a user
* User can get a specific user's email.
* User can send email to individuals.
* User can delete an email in a user's inbox.

### Prerequisites

* [Node JS](https://nodejs.org/)
* [Express](http://expressjs.com/)
* [Git](https://git-scm.com/downloads)
* [Travis CI](http://travis-ci.org/)
* [Coveralls](http://coveralls.io/)
* [Code Climate](http://codeclimate.com/)
* ESLint
* Babel
* Mocha
* Chai
* NYC

### Installation

Install a stable version of [Node](https://nodejs.org/)
Install [Git](https://git-scm.com/downloads)

##### Clone the repo

    git clone https://github.com/hustlaviola/EPIC-mail.git

##### Switch to the directory

    cd EPIC-mail

##### Install Node Modules

    npm install

##### Run the project

    npm start

### Documentation

[API](http://epic-email.herokuapp.com/api-docs/)

**Endpoint:** POST ``` /api/v1/auth/signup ```

Create a user account.

Request body:

    {
      "email": "String",
      "firstname": "String",
      "lastname": "String",
      "password": "String",
      "confirmpassword": "String",
      "phonenumber": "String"
    }

Response spec:

    {
      "status" : Integer,
      "data" : [ {
        "token" : String,
      } ]
    }

**Endpoint:** POST ``` /api/v1/auth/login ```

Login a user.

Request body:

    {
      "email": "String",
      "password": "String",
    }

Response spec:

    {
      "status" : Integer,
      "data" : [ {
        "token" : String,
      } ]
    }

**Endpoint:** POST ``` /api/v1/messages ```

Create a new message.

Request body:

    {
      "subject": "String",
      "message": "String"
    }

Response spec:

    {
      "status" : Integer ,
      "data" : [ {
        "id" : Integer ,
        "createdOn" : DateTime ,
        "subject" : String ,
        "message" : String ,
        "parentMessageId" : Integer,
        "status" : String ,
      } ]
    }

**Endpoint:** GET ``` /api/v1/messages ```

Fetch all received emails.

Response spec:

    {
      "status" : Integer ,
      "data" : [
        {
          "id" : Integer ,
          "createdOn" : DateTime ,
          "subject" : String ,
          "message" : String ,
          "senderId" : Integer ,
          "receiverId" : Integer ,
          "parentMessageId" : Integer,
          "status" : String ,
        }, {
          "id" : Integer ,
          "createdOn" : DateTime ,
          "subject" : String ,
          "message" : String ,
          "senderId" : Integer ,
          "receiverId" : Integer ,
          "parentMessageId" : Integer,
          "status" : String ,
        }
      ]
    }

**Endpoint:** GET ``` /api/v1/messages/unread ```

Fetch all unread received emails.

Response spec:

    {
      "status" : Integer ,
      "data" : [
        {
          "id" : Integer ,
          "createdOn" : DateTime ,
          "subject" : String ,
          "message" : String ,
          "senderId" : Integer ,
          "receiverId" : Integer ,
          "parentMessageId" : Integer,
          "status" : String ,
        }, {
          "id" : Integer ,
          "createdOn" : DateTime ,
          "subject" : String ,
          "message" : String ,
          "senderId" : Integer ,
          "receiverId" : Integer ,
          "parentMessageId" : Integer,
          "status" : String ,
        }
      ]
    }

**Endpoint:** GET ``` /api/v1/messages/sent ```

Fetch all sent emails.

Response spec:

    {
      "status" : Integer ,
      "data" : [
        {
          "id" : Integer ,
          "createdOn" : DateTime ,
          "subject" : String ,
          "message" : String ,
          "senderId" : Integer ,
          "receiverId" : Integer ,
          "parentMessageId" : Integer,
          "status" : String ,
        }, {
          "id" : Integer ,
          "createdOn" : DateTime ,
          "subject" : String ,
          "message" : String ,
          "senderId" : Integer ,
          "receiverId" : Integer ,
          "parentMessageId" : Integer,
          "status" : String ,
        }
      ]
    }

**Endpoint:** GET ``` /api/v1/messages/<message-id> ```

Fetch a specific email record.

Response spec:

    {
      "status" : Integer,
      "data" : {
        "id" : Integer ,
        "createdOn" : DateTime ,
        "subject" : String ,
        "message" : String ,
        "senderId" : Integer ,
        "receiverId" : Integer ,
        "parentMessageId" : Integer,
        "status" : String ,
      }
    }

**Endpoint:** DELETE ``` /api/v1/messages/message-id> ```

Delete a specific email record.

Response spec:

    {
      "status" : Integer,
      "data" : {
        "message" : "String"
      } 
    }

##### Testing

    npm test

[gh-pages](https://hustlaviola.github.io/EPIC-mail/UI/)

[Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2314375)

