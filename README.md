# PostIt


[![Build Status](https://travis-ci.org/3m3kalionel/PostIt.svg?branch=develop)](https://travis-ci.org/3m3kalionel/PostIt) . [![Coverage Status](https://coveralls.io/repos/github/3m3kalionel/PostIt/badge.svg?branch=feature%2Ftests)](https://coveralls.io/github/3m3kalionel/PostIt?branch=feature%2Ftests)  [![Code Climate](https://codeclimate.com/github/3m3kalionel/PostIt/badges/gpa.svg)](https://codeclimate.com/github/3m3kalionel/PostIt)

## Introduction

PostIt is an application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. It was developed using node.js with Express for routing and PostgreSQL for persisting data.

#### The application offers the following features:

Users can:

* Login/Signup with their username, password and email.
* Create chat groups.
* Add friends and colleagues to groups.
* Post messages in groups to which they belong.
* Read messages posted by friends in groups they belong.

### Dependencies

The app's functionality depends on the following Node.js packages:

* bcrypt
* bodyparser
* dotenv
* Express
* jsonwebtoken
* passportjs
* pg
* pg-hstore
* Sequelize ORM


    
### Installation
---

- To clone this repository, `run git clone https://github.com/3m3kalionel/PostIt.git`
- Run npm install to install the dependencies in the package.json file.

## Usage

- On your local machine, run `npm start` in your terminal to start the application.
- To run tests, run `npm test` in your terminal.

### Heroku
The app is hosted on heroku and can be used via [Postman](https://www.getpostman.com/). The routes work as listed above. A sample of the application can be found [here](https://postit3m3ka.herokuapp.com/)

##### Routes 

* POST `/api/user/signup` Use this route to create an account. The following fields are required:
	* `username` A user name of your choice
	* `password` A password between 8 and 20 characters in length
	* `email` A valid email address

* POST `/api/user/signin` Use this route to log into the application. The following fields are required:
	* `username` The username registered on signup
	* `password` The password registered on signup
* POST `/api/group` Use this route to create a new group. The following fields are required:
	* `name` The name of the group
	* `description` A few words about the group
* POST `/api/group/<:groupid>/user` Use this route to add a registered user to a created group. The following fields are required:
	* `groupid` The id of the group where the user is to be added
	* `userId` The id of the registered user to be added to be group
* POST `/api/group/<:groupid>/message` Use this route to post messages to a group. The following fields are required: 
	* `groupid` The id of the group where the messsage is to be posted
	* `content` The message to be posted

* GET `/api/group/<:groupid>/messages` Use this route to retrieve messages posted to the group. The following fields are required:
	* `groupid` The id of the group 
* GET `/api/group/<:groupid>/users` Use this route to list members of a group. The following fields are required:
	* `groupid` The id of the group
* GET `/api/group/<:userid>/groups` Use this route to list the groups you belong to. The following fields are required:
	* `userid` The id of the user(you)
