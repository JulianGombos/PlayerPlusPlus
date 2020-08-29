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
  const postId = req.body.postId;

  const newReply = new Reply({name, message, game, postId});

  newReply.save()
    .then(() => res.json('Reply added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:post').get((req, res) => {
  Reply.find({postId: req.params.post})
    .then(replies => res.json(replies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Reply.findByIdAndDelete(req.params.id)
    .then(() => res.json('Reply deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/postDeleted/:post').delete((req, res) => {
  Reply.deleteMany({postId: req.params.post})
    .then(() => res.json('Replies deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;