var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.get('/',function(request,response){
  response.render('index');
});

app.listen(8080);
console.log("Application listening on localhost:8080..");