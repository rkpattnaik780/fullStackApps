var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var mongofile = require('./mongourl');
var url = mongofile.url ;
var nodemailer = require('nodemailer');
app.use(bodyParser.json());



module.exports = app ;