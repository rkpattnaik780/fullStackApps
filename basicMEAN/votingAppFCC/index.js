var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongo = require('mongodb').MongoClient;
var mongofile = require('./routes/mongourl');
var url = mongofile.url ;
var signup = require('./routes/signup');
var login = require('./routes/login');
var checkemail = require("./routes/checkemail");
var checkuser = require('./routes/checkuser');
var checkvoted = require("./routes/checkvoted");
var votefor1 = require("./routes/votefor1");
var votefor2 = require("./routes/votefor2");
var votefor3 = require("./routes/votefor3");
var votefor4 = require("./routes/votefor4");
var loadmypolls = require("./routes/loadmypolls");
var loadpolls = require("./routes/loadpolls");
var deletepoll = require("./routes/deletepoll.js");
var submitpoll = require("./routes/submitpoll.js");
var dashboard = require("./routes/dashboard.js");
var profile = require("./routes/profile.js");
var logout = require("./routes/logout.js");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({ secret: "afsfujfdijf", resave: false, saveUninitialized: true }));

app.use('/signup', signup);
app.use('/login' , login);
app.use('/checkuserid', checkuser);
app.use('/checkemail',checkemail);
app.use("/checkvoted" , checkvoted);
app.use("/votefor1", votefor1);
app.use("/votefor2" , votefor2);
app.use("/votefor3" , votefor3);
app.use("/votefor4" , votefor4);
app.use("/loadmypolls" , loadmypolls);
app.use("/loadpolls" , loadpolls);
app.use("/deletepoll" , deletepoll);
app.use("/submitpoll" , submitpoll);
app.use('/dashboard', dashboard);
app.use("/profile" , profile);
app.use("/logout", logout);

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

var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'ramakpatt@gmail.com',
        pass: "abcdefghij" 
    }
});
app.listen(process.env.PORT || 3000);
console.log('app running on port no 3000');