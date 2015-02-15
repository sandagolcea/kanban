var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var listSchema = new Schema({
        name: String,
        cards : [{type: ObjectId, ref: 'Card'}]
});

var cardSchema = new Schema({
        _creator : { type: ObjectId, ref: 'List' },
        content: String
});

mongoose.model('List', listSchema);
mongoose.model('Card', cardSchema);

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Connection to mongodb successful!');
});


/*

var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : String,
  fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

*/