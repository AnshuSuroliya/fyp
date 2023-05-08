var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//const ngrok = require('ngrok');
//(async function() {
  //await ngrok.authtoken("2OyflwMC7sXzWRSI3FAyGhjbKy1_mgGcXgJSRibTd8qEcWZ5");
  //const url = await ngrok.connect(3000);
//})();

var app = express();
//const db = require("./keys/key").mongoURI;
// view engine setup
mongoose.connect("mongodb+srv://anshusuroliya09:anshu123@cluster0.tp4atg6.mongodb.net/smartstickDB", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//"mongodb://anshusuroliya09:anshu123@ac-ef21v4c-shard-00-00.tp4atg6.mongodb.net:27017,ac-ef21v4c-shard-00-01.tp4atg6.mongodb.net:27017,ac-ef21v4c-shard-00-02.tp4atg6.mongodb.net:27017/?ssl=true&replicaSet=atlas-nvrgkj-shard-0&authSource=admin&retryWrites=true&w=majority/smartstickDB"
//mongodb+srv://admin-anshu:anshu123@cluster0.3pjay.mongodb.net/test"
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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