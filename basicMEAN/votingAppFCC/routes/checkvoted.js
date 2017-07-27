var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var mongofile = require('./mongourl');
var url = mongofile.url ;
app.use(bodyParser.json());

app.post('/', function (req, res) {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("polling").findOne({ "question": req.body.question }, function (err, doc) {
            if (err) throw err;
            res.json(doc);
            db.close();
        });
    });
});

module.exports = app ;