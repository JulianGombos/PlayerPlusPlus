const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const GamePagePostSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  game: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  replyCount: {
    type: Number,
    default: 0,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
GamePagePostSchema.index({game: 'text'});

const GamePagePost = mongoose.model('GamePagePost', GamePagePostSchema);

module.exports = GamePagePost;