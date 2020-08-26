const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');

require('dotenv').config();

const app = express();

// Get the port the server is running on
const port = process.env.PORT || 5000; //13645

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Get MongoDB uri for connection from .env
const uri = process.env.ATLAS_URI;

// Connect to the database using the uri
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

// Upon successful connection print it to the console
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Importing the routes
const gameRouter = require('./Routes/game');
const users = require("./Routes/users");
const posts = require("./Routes/gamePagePost");
const replies = require("./Routes/reply");

// Getting passport setup
app.use(passport.initialize());
require("./config/passport") (passport);

// Assigning the routes
app.use('/games', gameRouter);
app.use("/users", users);
app.use("/posts", posts);
app.use("/replies", replies);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// App listens on the port and prints what port it is running on
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
