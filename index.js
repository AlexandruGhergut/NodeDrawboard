var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");
var PORT = process.argv.length <= 2 ? 3000 : process.argv[2];

console.log(process.argv.length);
app.use("/assets/", express.static(__dirname + "/assets"));

app.get('/', function(request, response){
  response.sendFile(__dirname + "/index.html");
});

http.listen(PORT, function(){
  console.log('listening on localhost:' + PORT);
});
