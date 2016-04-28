var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");

var PORT = process.argv.length <= 2 ? 3000 : process.argv[2];

app.use("/assets/", express.static(__dirname + "/assets"));

app.get('/', function(request, response){
  response.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket) {
	socket.on('disconnect', function(){
    	console.log('user disconnected');
    	io.emit('chat_message', 'user disconnected');
    });
    
    socket.on('chat_message', function(message) {
    	socket.broadcast.emit('chat_message', message);
    });
});

http.listen(PORT, function(){
  console.log('listening on localhost:' + PORT);
});
