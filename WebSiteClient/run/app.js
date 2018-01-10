var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require("mongoose")

mongoose.connect("mongodb://Uniline:Pei2017um@ds046067.mlab.com:46067/uniline",
{useMongoClient:true})
mongoose.Promise = global.Promise
var dbGlobal = mongoose.connection
dbGlobal.on("error",console.error.bind(console,"MongoDB connection error: "))

var index = require('./routes/index')
var order = require('./routes/order')
var signup = require('./routes/signup')
var signin = require('./routes/signin')
var prodef = require('./routes/prodef')
var encsuc = require('./routes/encsuc')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = dbGlobal
    next()
})

app.use('/', index)
app.use('/order', order)
app.use('/signup',signup)
app.use('/signin',signin)
app.use('/prodef', prodef)
app.use('/encsuc', encsuc)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

