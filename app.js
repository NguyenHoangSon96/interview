const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRoute = require('./routes/indexRoute');
const authentication = require('./routes/authenticationRoute');

const app = express();
require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({origin: true, credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.headers['api-key'] !== process.env.API_KEY) {
    res.status(403).send('Unauthorized');
  }
  next();
});

app.use('/authentication', authentication);
app.use('/', indexRoute);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.log(`Status: ${err.status}`);
  console.log(`Message: ${err.message}`);
  // log ngay h error
  console.log(err.error)
  next(err);
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.status === 500 || err.status === undefined ? 'Internal server error' : err.message,
    error: err.error || {},
  })
  //res.render('err');
});

module.exports = app;
