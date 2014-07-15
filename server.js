var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var messages = require('./chatfixture.json');

app.use(require('body-parser').json());

var sockets = [];
io.on('connection', function (socket) {
  sockets.push(socket);
});

app.get('/', function(req, res) {
  fs.createReadStream(__dirname + '/index.html').pipe(res);
});

app.use('/static', express.static(__dirname + '/static'));

app.get('/messages', function(req, res) {
  res.json(messages, 200);
});

app.post('/messages', function (req, res) {
  var message = req.body;
  messages.push(message);
  message.id = messages.length;
  sockets.forEach(function(socket) {
    socket.emit('message', message);
  });
  res.send(200);
});

server.listen(8081);

