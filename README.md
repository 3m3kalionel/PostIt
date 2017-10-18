# PostIt

[![Build Status](https://travis-ci.org/3m3kalionel/PostIt.svg?branch=fixes/feedback)](https://travis-ci.org/3m3kalionel/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/3m3kalionel/PostIt/badge.svg?branch=fixes/feedback)](https://coveralls.io/github/3m3kalionel/PostIt?branch=fixes%2Ffeedback)
[![Code Climate](https://api.codeclimate.com/v1/badges/0f45b0957adb9ee69f96/maintainability)](https://codeclimate.com/github/3m3kalionel/PostIt/maintainability)


PostIt is an application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. It was developed using [node.js](https://nodejs.org/en/) with [Express](https://expressjs.com/) for routing and [PostgreSQL](https://www.postgresql.org/) for persisting data.

### The application offers the following features:

Users can:

* Login/Signup with their username, password and email.
* Create chat groups.
* Add friends and colleagues to groups.
* Post messages in groups to which they belong.
* Read messages posted by friends in groups they belong.

### System Dependencies
* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)

### Usage
* To clone the repo run `git clone https://github.com/3m3kalionel/PostIt.git`
* Make sure you have Postgres installed and running.
* Change directory to `PostIt` using `cd PostIt` and run `npm install` to install the application.
* Create a .env file in the root folder of your app similar to the sample .env file provided.
* Run `npm start` to start the app or `npm run start-dev` to run it in a development-optimised environment.
* Enter the url [http://localhost:8080](http://localhost:8080) in your browser to use the app.
* Testing
run `npm test` to run tests.

### Heroku
The app is hosted on heroku and can be used via [Postman](https://www.getpostman.com/). The routes work as listed above. A sample of the application can be found [here](https://postit3m3ka.herokuapp.com/)

### Documentation
API Documentatin can be found [here](https://3m3kalionel.github.io/slate)

### Limitations
Some current limitations of the PostIt which are currently in development are:
* In-app notifications for group members
* Users should be able to see the friends in the groups who have read the messages sent out.
* Messages should be marked as “read” once a User has opened them.
* Read messages should be archived and not clutter a User’s Message Board.
* Real-time messaging


### Contributing to the Project

Contributions are welcome and appreciated
* Fork this repository
* Open a terminal and execute the following command to make a local copy `$ git clone git@github.com:your-username/postit`
* Run `cd postIt-app` to navigate into the folder
* Make your contributions to your local repo
* Add a connection to the original repo using `$ git remote add repo_nickname git://github.com/3m3kalionel/PostIt.git`. Note: repo_nickname is a nickname you choose
* Run git `$ remote -v` to verify that the connection is established
* Make your contributions to your local copy of the project
* Run `$ git add filename` `git commit -m "commit message"` to add and commit your contributions 
* Run `$ git push origin proposed-feature-name` to push your changes to your copy of the repository
* If you feel you've made a contribution that will improve the project, raise a Pull Request against develop branch.
* Be descriptive enough about your contributions so other contributors will understand what you've done

### License
This project is available for use and modification under the MIT License. See the LICENSE file for more details.

