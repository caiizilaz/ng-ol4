# ng-full-stack
ng-full-stack is todo and auth app built by Node, Express, Mongoose include Mocha, Chai for testing backend and include passport-jwt for authentication, for the frontend built by AngularCLI and PrimgNG feel free to use this repo and welcome for pull request

### dependencies
[node.js](https://nodejs.org "ttps://nodejs.org")
<br>[mongodb](https://www.mongodb.com "https://www.mongodb.com/")

### how to install
--- back end ---
<br>clone this repo and run : <br>**npm install**
<br>--- front end ---
<br>goto angular directory and run : <br>**npm install**

### how to run
--- back end ---
<br>to start server and mongodb server type : <br>**npm start**
<br>test nodejs and http request by mocha and chai type : <br>**npm test**  (***cancel npm start and start mongodb first)
<br>--- front end ---
<br>goto angular directory and type : <br>**ng serve**

## deploy step on heroku
<br>1.in package.json at scripts start change **"concurrently \\"mongod\\" \\"nodemon\\""** to **"node app"**
<br>2.edit gitignore file, open comment under #in prod on heroku then comment on /public
<br>3.go to app.js then change port from **3000** to **8080**
<br>4.go to angular foler and run: **ng build**
<br>5.in angular folder edit src/app/class/config.ts, at api variable change **'http://localhost:3000/'** to **''** (empty string)
<br>6.**git init**, **git add .**, **git commit** then run **heroku create** and **git push heroku master**
<br>7.go to heroku console then add mongodb addon (mlab)
<br>8.go to mlab console create new database then add collection and user for connect
<br>9.change mongodb url in server/config/db.js
<br>10.re commit your code to heroku again
<br>11.finish now
