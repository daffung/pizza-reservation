require('dotenv').config()
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')


var availabilityRouter = require('./routes/availabilityRoute');
var reservationRouter = require('./routes/reservationRoute')

var app = express();

mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology:true,useNewUrlParser:true
})
var db = mongoose.connection
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/availability', availabilityRouter);
app.use('/reserve',reservationRouter)

db.on("error",console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("connect to database")
})
module.exports = app;
