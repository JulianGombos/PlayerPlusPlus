const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameTileSchema = new Schema({
  name: {type: String, required: true},
  pageurl: {type: String, required: true}
}, {
  timestamps: true
});
//Picture element needs to be added to the model so each game tile has a unique picture
//Some kind of url element to store a link to the game tile's corresponding web page

const GameTile = mongoose.model('GameTile', gameTileSchema);

module.exports = GameTile;