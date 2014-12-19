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
    });
var userCount = 0;

io.on('connection', function(socket) {
    console.log("connect!");
    userCount = userCount + 1;
    socket.on('newUser', function (newUser) {
            console.log("new user function");
            console.log('newUser', newUser);
            var user = sequelize.define('users', {
                    userid: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
                    username: Sequelize.STRING,
                    password: Sequelize.STRING,
                    email: Sequelize.STRING
                },
                {
                    timestamps: false
                });
            newUser.id = 0;
            return sequelize.sync().then(function () {
                return user.create(/*{
                 title: title,
                 description: description,
                 content: content,
                 user_id: 1
                 }*/ newUser);
            });
        }
    );
    socket.on('disconnect', function () {
        userCount = userCount - 1;
        //console.log('a user disconnected','there are now',userCount,"users online");
    });
});
