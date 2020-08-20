const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const ReplySchema = new Schema({
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
  postId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
ReplySchema.index({game: 'text'});

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;