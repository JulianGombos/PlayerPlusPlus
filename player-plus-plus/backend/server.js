const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require("passport");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const gameRouter = require('./Routes/game');
const users = require("./Routes/users");
const posts = require("./Routes/gamePagePost");
const replies = require("./Routes/reply");

app.use(passport.initialize());
require("./config/passport") (passport);

app.use('/games', gameRouter);
app.use("/users", users);
app.use("/posts", posts);
app.use("/replies", replies);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
