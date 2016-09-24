var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var jwt          = require("jwt-simple");
//var moment       = require('moment');

/**默认的controller**/
var routes = require('./server/controller/index');
/**用户的contrller**/
var users = require('./server/controller/usersAction');
/**角色的contrller**/
var role = require('./server/controller/roleAction');
/** 菜单contrller **/
var menu = require('./server/controller/menuAction');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//jwt app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');
app.set("jwtTokenSerect","playGroundAdmin");
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'playGroundAdminSecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 300 * 1000 }
}));

app.use('/', routes);
app.use("/menu",menu);
app.use('/user',users);
app.use("/role",role);

app.use(express.static(path.join(__dirname, 'public')));


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
