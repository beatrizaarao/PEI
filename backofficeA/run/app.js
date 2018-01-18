var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    hostname : 'localhost',
    port: '3307',
    user     : 'root',
    password : '',
    database : 'id4056546_uniline'

});

connection.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});




var index = require('./routes/index');
var users = require('./routes/users');
var clients = require('./routes/clients');
var tasks = require('./routes/tasks');
var message = require('./routes/message');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

connection.query("SELECT * FROM Task WHERE STATE=0", function (error, result, client){
    app.locals.missedd = result
});



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    req.connection = connection;
    next();
});



app.use('/', index);
app.use('/users', users);
app.use('/clients', clients);
app.use('/tasks', tasks);
app.use('/messages', message);
//app.use(f1);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
/*
function f1(req, res, next){
    var db = req.connection;
    var missed = "";
    missed = db.query("SELECT * FROM Task WHERE STATE=0")
    console.log("PORRA" + missed);
    res.locals.missedTasks = 1;
    next();
}

*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
