var express = require('express');
var app = express();
var session = require('express-session');

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');

var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/votingapp';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({ secret: "afsfujfdijf", resave: false, saveUninitialized: true }));

app.post('/signup', function (req, res) {
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

app.post('/login', function (req, res) {
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

app.post('/sendpwd', function (req, res) {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").findOne({ email: req.body.email }, function (err, doc) {  // even only rm works
            if (err) throw err;
            console.log(doc);
            if (doc) {
                var mailOptions = {
                    from: '"Admin" <ramakpatt@gmail.com>', // sender address
                    to: doc.email, // list of receivers
                    subject: 'Your password for votingApp', // Subject line
                    html: "<h1>Hello " + doc.fname + '</h1><p>Your password for votingApp is - "<b>' + doc.password + '</b>"</p>' // plain text body
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.json(doc);
            }
            else res.json();
            db.close();
        });
    });
});

app.get('/dashboard', function (req, res) {
    res.json(req.session.user);
});

app.get('/profile', function (req, res) {
    res.json(req.session.user);
});

app.post('/checkuserid', function (req, res) {
    console.log(req.body);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").findOne({ userid: req.body.userid }, function (err, doc) {
            if (err) throw err;
            res.json(doc);
            db.close();
        });
    });
});

app.post('/checkemail', function (req, res) {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("users").findOne({ email: req.body.email }, function (err, doc) {
            if (err) throw err;
            res.json(doc);
            db.close();
        });
    });
});

app.post('/votefor1', function (req, res) {
    console.log(req.body);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("polling").updateOne({ question: req.body.question },
            { $inc: { c1: 1 } , $push: { voters : req.session.user.userid}}, function (err, doc) {
                if (err) throw err;
                console.log("1 record updated");
                console.log(doc);
                res.json(doc);
                db.close();
            });
    });
});

app.post('/votefor2', function (req, res) {
    console.log(req.body);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("polling").updateOne({ question: req.body.question },
            { $inc: { c2: 1 }  , $push: { voters : req.session.user.userid }}, function (err, doc) {
                if (err) throw err;
                console.log("1 record updated");
                console.log(doc);
                res.json(doc);
                db.close();
            });
    });
});

app.post('/votefor3', function (req, res) {
    console.log(req.body);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("polling").updateOne({ question: req.body.question },
            { $inc: { c3: 1 } , $push: { voters : req.session.user.userid} }, function (err, doc) {
                if (err) throw err;
                console.log("1 record updated");
                console.log(doc);
                res.json(doc);
                db.close();
            });
    });
});

app.post('/votefor4', function (req, res) {
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

app.post('/deletepoll', function (req, res) {
    console.log(req.body);
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("polling").deleteOne({ question: req.body.question }, function (err, doc) {
            if (err) throw err;
            console.log("Selected poll deleted");
        });

        res.end();
        db.close();
    });
});


app.get('/loadpolls', function (req, res) {
    console.log("Loading all the polls");
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection('polling').find().toArray(function (err, docs) {
            if (err) throw err;
            res.json(docs);
            db.close();
        });
    });
});

app.post('/submitpoll', function (req, res) {
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

app.post('/loadmypolls', function (req, res) {
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

app.post('/checkvoted', function (req, res) {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        db.collection("polling").findOne({ "question": req.body.question }, function (err, doc) {
            if (err) throw err;
            res.json(doc);
            db.close();
        });
    });
});

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.end();
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'ramakpatt@gmail.com',
        pass: process.argv[2]
    }
});

app.listen(3000);
console.log('app running on port no 3000');