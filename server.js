var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./models.js');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var List = mongoose.model('List');
var Card = mongoose.model('Card');
var Board = mongoose.model('Board');

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.get('/', function(request,response){
  response.redirect('/dashboard');
});

// shows a dashboard (collection of boards)
app.get('/dashboard', function(request,response){
  Board.find()
  .populate('lists')
  .exec(function (err, myBoard) {
    if (err) return console.error(err);
    response.render('dashboard', {board: myBoard});
  });
});

// shows a board (collection of lists)
app.get('/board/:id', function (request,response) {
  console.log(request.params.id);
  List.find({_creator : request.params.id })
  .populate('cards') // only works if we pushed refs to children
  .exec(function (err, myLists) {
    if (err) return console.error(err);
    response.render('board',{boardId: request.params.id, list : myLists});
  });
});

// creates a new board and redirects back to dashboard
app.post('/board', parseUrlencoded, function (request, response) {
  console.log("Body is:"+request.body.boardId);
  new Board({ name: request.body.board })
  .save(function (err, newBoard) {
    if (err) return console.error(err);
    response.redirect('/dashboard');  
  });
});

// creates a new list and redirects back to board
app.post('/list/:boardId', parseUrlencoded, function (request, response) {
  new List({ 
    _creator: request.params.boardId,
    name: request.body.list })
    .save(function (err, newList) {
        if (err) return console.error(err);
        Board.findOne({_id: request.params.boardId}, function (err, board) {
          if (err) return console.error(err);
          board.lists.push(newList);
          board.save(function (err) {
            if (err) return handleError(err);
            response.redirect('/board/' + request.params.boardId);
          });
        })
    });
});

// creates a new card and redirects back to board
app.post('/card/:listId/:boardId', parseUrlencoded, function (request,response) {
  new Card({ 
    _creator: request.params.listId, 
    content: request.body.card })
    .save(function (err, newCard) {
      if (err) return console.error(err);

      List.findOne({ _id: request.params.listId }, function (err, list) {
        if (err) return console.error(err);
        list.cards.push(newCard);

        list.save(function (err) {
          if (err) return handleError(err);
          response.redirect('/board/'+request.params.boardId);
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