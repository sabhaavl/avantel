var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
// mongoose 
// 	.connect("mongodb://localhost/srtestgen", { useNewUrlParser: true, useUnifiedTopology: true })
// 	.then(() => console.log("Connected to MongoDB..."))
// 	.catch(err => console.error("Could not connect to MongoDB...", err));

var app = express();
var contactRouter = require("./routes/contact")
const uploadResumeRouter = require('./routes/uploadResume');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './public/assets/resumes'));
  },
  filename: function (req, file, cb) {
    console.log(' file.originalname', file.originalname)
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    // cb(null, file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });


app.post('/storeContact', contactRouter);
app.post('/resume', upload.single('resume'), uploadResumeRouter);

app.use("/*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
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
