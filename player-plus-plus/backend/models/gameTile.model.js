const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameTileSchema = new Schema({
  name: {type: String, required: true},
}, {
  timestamps: true
});

const GameTile = mongoose.model('GameTile', gameTileSchema);

module.exports = GameTile;