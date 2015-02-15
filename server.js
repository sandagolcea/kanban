var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./lists.js');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var List = mongoose.model('List');

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.get('/', function (request,response) {
  List.find(function (err, myLists) {
    if (err) return console.error(err);
    console.log(myLists);
    response.render('index',{list : myLists});
  });
});

app.post('/lists', parseUrlencoded, function (request, response) {
  var myList = new List({ name: request.body.list});
  
  myList.save(function (err, newList) {
    if (err) return console.error(err);
    console.log(newList.id);
  });

  response.redirect('/');
});

app.post('/cards', parseUrlencoded, function (request,response) {
  list = request.body.listId;
  // mainList[list].cards.push({id: cardId, content: request.body.card});
  response.redirect('/');
});

app.listen(8080, function(){
  console.log("Application listening on localhost:8080..");
});
/*

This is how my mainList object looks like

{ "1234" : {
  name: "Sanda",
  cards: [ 
          { id: 1, content: "My first card"},
          { id: 2, content: "My second card"}
  ]}, 
  "432" : {
  name: "Jair",
  cards: [ 
          { id: 1, content: "My first card"},
          { id: 2, content: "My second card"}
  ]} 
}

*/