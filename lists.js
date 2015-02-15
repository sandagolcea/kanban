var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;

var listSchema = new Schema({
        name: String
});

mongoose.model('List', listSchema);

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Connection to mongodb successful!');
});
