# CG Estimator

A job-costing application for CG Coatings, a responsive web application accessible on a desktop, laptop, iPhone, or Android device running the current Chrome browser. 

- Node.js platform
- Express web framework 
- EJS templating engine
- MVC design pattern
- Mongoose MongoDB object modeling
- Lodash for JavaScript object iteration and manipulation 
- jQuery library for DOM manipulation
- BootStrap framework for responsive design
- Passport for user authentication

Developed as part of the profession-based learning cirriculum at:

Northwest Missouri State University 

School of Computer Science and Information Systems

Dr. Carol Spradling, Director

Maryville, Missouri

# Contributors

Client

- Curt Carpenter

Faculty

- Denise Case
- Michael Rogers
- Nathan Eloe
- Tianyang Wang
- Jerry Qin
- Diana Linville

Assistants

- Rathnakar Ettidi
- Sandip Subedi
- Vamsi Ravva

Developers, Designers, and Software Engineers

- Fall 2017 44-563 Web Apps 
- Spring 2017 44-563 Web Apps Sections 2,3,4
- Spring 2017 44-144 Web Apps Section 1
- Fall 2016 44-563 Web Apps Sections 3,4,5, 6

# Prerequisites

Following must be downloaded, installed, and configured according to the product directions: 

1. MongoDB (Community Edition)
2. Node.js and npm 
3. Git version control system

NOTE: Follow all installation instructions. For example, you must add the mongo binaries folder (e.g. C:\Program Files\MongoDB\Server\3.4\bin) to your environment Path variable[1]. If running on C:\, you must create a c:\data\db folder.

To upgrade from an earlier version to npm 5, run npm install -g npm@latest and reinstall all dependencies with rm -rf node_modules then npm install again.


# Get started

Clone this repo to your local machine. If Windows, 

- Right-click on parent folder (e.g. C:\44563) and select:
- git clone yourprojecturl

# Live updateds (just once when setting up the project)

Open a command window in this project folder 

Install nodemon globally to enable live updates.

```
> npm install -g nodemon
```


# Install dependencies as needed before running the app

Run npm install to install all the dependencies in the package.json file 
once before you begin and as new dependencies are added.

```
> npm install
```

# Start up Mongodb

Right-click on the project folder and open Git Bash. Run mongod to start MongoDB. This process runs the database and must be available while the application is running.  (Hit CTRL-C to stop or close the window.)

```
$ mongod 
```

# Run the app

In Windows, right-click on the project folder and "Open Command Window Here as Administrator". At the prompt, type nodemon app to start the server.  (CTRL-C to stop.)

```
> nodemon app.js
```

Open your browser to the location displayed, e.g. http://localhost:8089/

# Building and editing the code

Install Visual Studio Code.

Right-click on your project folder and select "Open with Code".

To type commands from within VS Code, from the VS Code menu, select View / Integrated Terminal.

RECOMMENDED: 

- Under VS Code menu "File" option, check "Autosave"


# Application structure

- app.js - Starting point for the application. Defines the express server, connects it to MongoDB using mongoose, requires routes and models. Loads everything and begins listening for events. 
- config/ - configuration information for passport authentication and configuration/environment variables
- controllers/ - logic for handling client requests
- data/ - seed data loaded each time the application starts
- models/ - schema descriptions for custom data types
- routes/ - route definitions for the API
- test/ - see more below
- views/ - dyanmically-generated web pages 

test folder

- integration - verify API returns correct response bodies and status codes
- unit - test logic

# PULL FIRST 

For a better experiences, never make changes to stale code.

Before making any changes, pull new code. 

Make small changes and commit. 

If away from the code for awhile, always pull new code. 

The repo will change OFTEN and A LOT. :) 

# Links

- Team: https://bitbucket.org/nw_webapps_2017_fall_staff/  
- Repo: https://bitbucket.org/nw_webapps_2017_fall_staff/cge  
- Dr. Case: https://bitbucket.org/professorcase/  
- Dr. Rogers: https://bitbucket.org/mprogers/  
- Dr. Eloe: https://bitbucket.org/neloe/  
- Dr. Wang: 

# References

- chrome://net-internals/#hsts
- Security: https://blog.heroku.com/node-habits-2017
- Helmet: https://helmetjs.github.io/
- https://www.openssl.org/
- Create OpenSSL Certificate: https://www.akadia.com/services/ssh_test_certificate.html
- Testing: https://mochajs.org/
- http://es6-features.org
- https://github.com/airbnb/javascript
- https://github.com/sahat/hackathon-starter
- https://blog.risingstack.com/node-js-security-checklist/
- https://expressjs.com/en/resources/glossary.html
- https://github.com/sqreen/awesome-nodejs-projects
- https://www.sitepoint.com/yarn-vs-npm/
- http://oslc.github.io/developing-oslc-applications/oslc-open-source-node-projects.html

# JavaScript Standard Style

- Install JavaAcript STandard Style extension in VS Code.

- Set "javascript.validate.enable": false in VSCode settings.json to disable VSCode built-in validator.

- VS Code / View / Command Palette: Fix all auto-fixable problems

![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)]

https://github.com/feross/standard

 #### Setting Windows Path

[1] To set Windows environment variables such as the path, follow the steps  described at: 
https://code.msdn.microsoft.com/Mongo-Database-setup-on-6963f46f

