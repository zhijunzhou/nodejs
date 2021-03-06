var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var auth = require('./middlewares/auth');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var router = require('./routes/index');
var errorHandler = require('errorhandler');
var requestLog = require('./middlewares/request_log');
var app = express();

var staticDir = path.join(__dirname, 'public');

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use('/public', express.static(staticDir));

// Request logger
app.use(requestLog);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cookie-parser')(config.session_secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(session({
  secret: 'time_note',
  name:'time_note',
  cookie: {maxAge: 3600000},
  resave: true,
  rolling: true,
  saveUninitialized: true
}));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  // app.use(errorHandler);
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
