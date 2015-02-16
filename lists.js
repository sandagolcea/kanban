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
