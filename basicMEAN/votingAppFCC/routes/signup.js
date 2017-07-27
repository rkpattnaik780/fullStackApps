var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var mongofile = require('./mongourl');
var url = mongofile.url ;
//var url = 'mongodb://localhost:27017/votingapp';

app.use(bodyParser.json());

app.post('/', function (req, res) {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").insertOne(req.body, function (err, doc) {
            if (err) throw err;
            console.log(doc);
            req.session.user = req.body;
            res.json(req.body);
            db.close();
        });
    });
});

module.exports = app;