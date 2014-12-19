/**
 * Created by ajfraser on 14-11-19.
 */
var port= 5000;

var express = require('express');
var app = express();

/* changed.Server to .createServer */
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var redis = require('redis');
client = redis.createClient();

/* Listen to port */
console.log("listening on port " + port);
server.listen(port);
app.use(express.static(__dirname + "/public"))

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("app name", "tudu", redis.print);

/* looks for request and response from the html (added _dirname because of multiple users) */
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

/* looks for the style sheet */
app.use("/style.css", express.static(__dirname + '/style.css'));

var Sequelize = require('sequelize')
    , sequelize = new Sequelize('tudu', 'ajfraser', '', {
        dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
        port:    5432, // or 5432 (for postgres)
    })

sequelize
    .authenticate()
    .complete(function(err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    })


