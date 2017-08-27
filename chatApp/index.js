var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/meansocket';

server.listen(3000, function () {
    console.log("Listening on port 3000");
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

io.sockets.on("connection", function (socket) {
    console.log("sockets  is working");
    socket.on('sendmsg', function (data) {
        console.log(data);
        mongo.connect(url, function (err, db) {
            db.collection("list").insertOne({ "msgre": data }, function (err, res) {
                if (err) throw err;
                io.sockets.emit('msgclient', { "msgre" : data});
                db.close();
            });
        });
    });
    socket.on('loadmsgs', function () {
        console.log("Here");
        mongo.connect(url, function (err, db) {
            if (err) throw err;
            db.collection('list').find().toArray(function (err, docs) {
                if (err) throw err;
                io.sockets.emit('avlmsgs' , docs);
                db.close();
            });
        });
    });
});
