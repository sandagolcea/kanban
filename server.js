var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var mainList = [];

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.get('/', function(request,response){
  response.render('index',{list : mainList});
});

app.post('/lists', parseUrlencoded, function (request, response) {
  mainList.push(request.body.list);
  response.redirect('/');
});

app.listen(8080, function(){
  console.log("Application listening on localhost:8080..");
});
