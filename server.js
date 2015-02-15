var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var mainList = {};
var listId = 0;
var cardId = 0;

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.get('/', function (request,response) {
  response.render('index',{list : mainList});
});

app.post('/lists', parseUrlencoded, function (request, response) {
  mainList[listId] = {name: request.body.list, cards: []};
  console.log(mainList[listId]);
  listId++;
  response.redirect('/');
});

app.post('/cards', parseUrlencoded, function (request,response) {
  list = request.body.listId;
  if (!mainList[list]) console.log("mainList null");
  console.log("Card:"+request.body.card);
  mainList[list].cards.push({id: cardId, content: request.body.card});
  console.log("Main cards:"+mainList[list].cards);
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