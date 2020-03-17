const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, //Has to be unique
    trim: true, //Trims whitespace added
    minlength: 3
  },
}, {
  timestamps: true, //Autmatically creates fields for when it was created and modified
});

const User = mongoose.model('User', userSchema);

module.exports = User;