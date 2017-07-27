var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var mongofile = require('./mongourl');
var url = mongofile.url ;
app.use(bodyParser.json());

app.post('/', function (req, res) {
    console.log("load my polls");
    console.log(req.body.userid);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection('polling').find({ "creator": req.body.userid }).toArray(function (err, docs) {
            if (err) throw err;
            res.json(docs);
            db.close();
        });
    });
});

module.exports = app ;