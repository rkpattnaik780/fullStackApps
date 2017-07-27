var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var mongofile = require('./mongourl');
var url = mongofile.url ;
app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log("Loading all the polls");
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var mysort = { question : 1 };
        db.collection('polling').find().sort(mysort).toArray(function (err, docs) {
            if (err) throw err;
            res.json(docs);
            db.close();
        });
    });
});

module.exports = app ;