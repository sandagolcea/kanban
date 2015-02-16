var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./lists.js');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var List = mongoose.model('List');
var Card = mongoose.model('Card');

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.get('/', function (request,response) {

  List.find()
  .populate('cards') // only works if we pushed refs to children
  .exec(function (err, myLists) {
    if (err) return console.error(err);
    response.render('index',{list : myLists});
  }); 
});

app.post('/lists', parseUrlencoded, function (request, response) {
  new List({ name: request.body.list })
    .save(function (err, newList) {
        if (err) return console.error(err);
        response.redirect('/');
    });
});

app.post('/cards', parseUrlencoded, function (request,response) {
  new Card({ 
    _creator: request.body.listId, 
    content: request.body.card })
    .save(function (err, newCard) {
      if (err) return console.error(err);

      List.findOne({ _id: request.body.listId }, function (err, list) {
        if (err) return console.error(err);
        list.cards.push(newCard);

        list.save(function (err) {
          if (err) return handleError(err);
          response.redirect('/');
        });
      });
  });
});

app.listen(8080, function(){
  console.log("Application listening on localhost:8080..");
});
/*

This is how my mainList object looks like

{ {id: 452319974,
  name: "Sanda",
  cards: [ 
          { id: 1, content: "My first card"},
          { id: 2, content: "My second card"}
  ]}, 
  {
  id: 8209375843,
  name: "Jair",
  cards: [ 
          { id: 1, content: "My first card"},
          { id: 2, content: "My second card"}
  ]} 
}

*/