var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');

var routes = require('./routes/index');
// var users = require('./routes/users');
// var movie = require('./routes/movie');
var news = require('./controller/news');
// var caqi = require('./routes/')
  

var errorHandler = require('errorhandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '12345',
  name:'testapp',
  cookie: {maxAge: 8000},
  resave: false,
  saveUninitialized: true,
}))

app.use('/', routes);

app.get('/news/:nid', news.showEdit);
app.post('/news/create', news.createNews);
// app.use('/movie', routes);

// user routes
// app.use('/user/register', users.register);

// app.get('/movie/add', movie.movieAdd);// add
// app.post('/movie/doAdd', movie.doMovieAdd);// post add
// app.get('/movie/list', movie.list);
// app.get('/movie/:name',movie.movieAdd);
// app.get('/movie/json/:name',movie.movieJson);
// app.get('/movie/:name', movie.movieAdd); // edit query
// app.get('/movie/json/:name', movie.movieJSON); // json data

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
  app.use(errorHandler);
  // app.use(function(err, req, res, next) {
  //   res.status(err.status || 500);
  //   res.render('error', {
  //     message: err.message,
  //     error: err
  //   });
  // });
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
