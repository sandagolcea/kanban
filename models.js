var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var boardSchema = new Schema({
        name: String,
        lists : [{type: ObjectId, ref: 'List'}]
});

var listSchema = new Schema({
        _creator : { type: ObjectId, ref: 'Board' },
        name: String,
        cards : [{type: ObjectId, ref: 'Card'}]
});

var cardSchema = new Schema({
        _creator : { type: ObjectId, ref: 'List' },
        content: String
});

mongoose.model('Board', boardSchema);
mongoose.model('List', listSchema);
mongoose.model('Card', cardSchema);

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Connection to mongodb successful!');
});
/*

This is how my mainList object looks like
without the boards. Inception++ I like it.
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