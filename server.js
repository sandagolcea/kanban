var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();

app.get('/',function(request,response){
  response.send("Hello world");
});

app.listen(8080);
console.log("Application listening on localhost:8080..");