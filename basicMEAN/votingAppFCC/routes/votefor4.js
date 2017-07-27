var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var mongofile = require('./mongourl');
var url = mongofile.url ;
app.use(bodyParser.json());

app.post('/', function (req, res) {
    console.log(req.body);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("polling").updateOne({ question: req.body.question },
            { $inc: { c4: 1 } , $push: { voters : req.session.user.userid } }, function (err, doc) {
                if (err) throw err;
                console.log("1 record updated");
                console.log(doc);
                res.json(doc);
                db.close();
            });
    });
});
module.exports = app ;