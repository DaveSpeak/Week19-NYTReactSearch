var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SavedSchema = new Schema({
  location: {
    type: String,
  },
  date: {
  	type: Date
  }
});

var Saved = mongoose.model('Saved', SavedSchema);
module.exports = Saved;
