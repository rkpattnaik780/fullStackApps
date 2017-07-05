var express = require('express');
var app = express();
var url = 'mongodb://localhost:27017/phonebook';
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// name of database used is 'phonebook'  collection name is list

app.get('/contactlist', function (req, res) {
    console.log('a get request');
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection('list').find().toArray(function (err, data) {
            if (err) throw err;
            res.json(data);
            db.close();
        });
    });
});
app.post('/contactlist', function (req, res) {
    // console.log(req.body) ;
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("list").insertOne(req.body, function (err, doc) {
            if (err) throw err;
             console.log(doc);
            //res.json(doc); // this was missing which stopped the post method to be executed further. //
            res.end();
            db.close();
        });
    });
});

app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id + ' deleted');
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var id = req.params.id;
        var rm = new ObjectID(id);
        console.log(rm) ;
        db.collection("list").deleteOne({_id : rm}, function (err, doc) {
            if (err) throw err;
            console.log('1 doc deleted');
            res.json(doc);
            db.close();
        });
    });
});

app.get('/contactlist/:id' , function(req,res){
    var id = req.params.id ;
    var rm  = new ObjectID(id) ;
    console.log(req.body);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
       db.collection("list").findOne({ _id : rm}, function (err, doc) {  // even only rm works
            if (err) throw err;
            console.log(req.body);
            console.log('edit a record');
            res.json(doc);
            db.close();
        }); 
    /*    */
    });
}); 

app.put('/contactlist/:id' , function(req,res){
    var id = req.params.id ; 
    var rm  = new ObjectID(id) ;
    console.log(req.body.name);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("list").updateOne( { _id : rm} , 
       { $set : { name : req.body.name ,
                   email : req.body.email ,
                    number : req.body.number}}, function(err, doc) {
    if (err) throw err;
    console.log("1 record updated");
    res.json(doc);
    db.close();
  });
    }); 
    
});
app.listen(3000);
console.log('app running on port no 3000');