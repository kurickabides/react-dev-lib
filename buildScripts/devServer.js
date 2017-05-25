/* eslint-disable no-unused-vars */
/** Note this file was designed for front end loading
/* @todo remove the express and other the application specific code
/* to a server side application file and load express there */
//import base libs that you will need for the application
import 'babel-polyfill';
import express from 'express';
import path from 'path';
import open from 'open';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import moment from 'moment';//import routes
import moviesRoute from '../src/server/routes/movie';
import errorHandler from '../src/server/routes/utils/errorHandler'
//import other libs
import {default as log} from '../src/server/core/logger';
//Add logger info
let logger = new log();
// sets config options on winston
logger.cfg({consoleLevel: 'debug',fileLevel: 'error'});


//passport imports
import mongoose from 'mongoose';


//Import Web Pack Here
import webpack from 'webpack';
import config from '../webpack.config.dev';

//Database Connection go here
import {default as Database} from  "../src/server/data/db";

/** @todo create a service for loading data into the database
 everytime the application starts for testing */
//Add sample data here
Database.connect().then(() => {
logger.log("Database is connected")
}).catch((error)=>{
  logger.log(error, 'error')
});
//Constants go Here
const port = 3000;
const app = express(() => {
logger.log("Database is connected")
});

/** Database Connections go Here */
mongoose.connect("mongodb://localhost/MovieApp");


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(methodOverride())

app.use(logger.dev);


// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used
// for signing the cookies.

app.use(cookieParser('foobars'));
// parses json, x-www-form-urlencoded, and multipart/form-data


app.use('/css', express.static('src/client/public/styles'));


//Get complier for webpack-dev-middleware
const compiler = webpack(config);
//pass complier to
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

/** Mount Api's Here */
//mount movie api module here
app.use('/movies', moviesRoute);

//cause error to occur
app.use('/errortest', function (req, res, next) {
let err = {message: 'Test route is Testing Error Route', status: 509, stack: [{message: 'An error test', status: 505}, {message: 'From the Movie test error page',status: 501}]}
  next(err)
});


// dev error handler catch all
app.use(function (err, req, res, next) {
  res.status(err['status'] || 500);
  if (err.message) {
    logger.log(err.message,'error');
    res.render('pages/error', {
    message: err.message,
    error: err,
    stack: err.stack

  });
}
else {
  logger.log(err,'error');
  res.render('pages/error', {
  message: err,
  error: err
});
}

})

app.listen(port, function(err) {
  if (err) {
    logger.log(err,'error');
  } else {
    open('http://localhost:' + port);
  }
});
