const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get((req, res) =>{
  Game.find().sort({name: 1})
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const picUrl = req.body.picUrl;
  const newGame = new Game({name, picUrl});

  newGame.save()
    .then(() => res.json('Game added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Game.findById(req.params.id)
    .then(game => res.json(game))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/search/:name').get((req, res) => {
  Game.find({name: req.params.name}).collation({locale: "en", strength: 2})
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;