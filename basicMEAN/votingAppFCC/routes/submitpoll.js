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
        var record = {
            "question": req.body.question,
            "c1": 0,
            "c2": 0,
            "c3": 0,
            "c4": 0,
            "creator": req.session.user.userid,
            "op1": req.body.op1,
            "op2": req.body.op2,
            "op3": req.body.op3,
            "op4": req.body.op4,
            "voters": []
        };
        db.collection('polling').insertOne(record, function (err, record) {
            if (err) throw err;
            res.json({ status: 200 });
            db.close();
        });
    });
});

module.exports = app ;