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
        db.collection("users").findOne({ userid: req.body.userid }, function (err, doc) {  // even only rm works
            if (err) throw err;
            console.log(doc);
            if (doc) {
                if (doc.password == req.body.password) {
                    console.log("Successfully logged in");
                    req.session.user = doc;
                    res.json(doc);
                }
                else res.json();
            }
             else res.json();
            db.close();
        });
    });
});

module.exports = app;