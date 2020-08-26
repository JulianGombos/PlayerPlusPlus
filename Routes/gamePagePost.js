const router = require('express').Router();
let GamePagePost = require('../models/gamePagePost.model');

router.route('/').get((req, res) =>{
  GamePagePost.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/post').post((req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const game = req.body.game;
  const platform = req.body.platform;

  const newPost = new GamePagePost({name, message, game, platform});

  newPost.save()
    .then(() => res.json('Reply added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:game').get((req, res) => {
  GamePagePost.find({game: req.params.game})
    .then(game => res.json(game))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getpost/:id').get((req, res) => {
  GamePagePost.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  GamePagePost.findById(req.params.id)
    .then(post => {
      post.name = req.body.name;
      post.message = req.body.message;
      post.replyCount = Number(req.body.replyCount);
      post.game = req.body.game;
      post.platform = req.body.platform;

      post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
