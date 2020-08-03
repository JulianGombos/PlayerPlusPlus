const mongoose = require('mongoose');

//This schema contains all the information the an object needs that has to be on the game page

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: {type: String, required: true}
}, {
  timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;