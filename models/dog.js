// Dependencies
var mongoose = require('mongoose');
// Schema
var dogSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  sex: String,
  height: String,
  weight: Number,
  dogAKCPapers: String,
  owner : { type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}
});

// Return model
mongoose.model('Dog', dogSchema)