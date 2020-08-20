const router = require('express').Router();
let Reply = require('../models/reply.model');

router.route('/').get((req, res) =>{
  Reply.find()
    .then(replies => res.json(replies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/reply').post((req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const game = req.body.game;

  const newReply = new Reply({name, message, game});

  newReply.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;