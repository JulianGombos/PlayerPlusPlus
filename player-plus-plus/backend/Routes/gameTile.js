const router = require('express').Router();
let GameTile = require('../models/gameTile.model');

router.route('/').get((req, res) =>{
  GameTile.find()
    .then(gameTiles => res.json(gameTiles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const pageurl = req.body.pageurl;

  const newGameTile = new GameTile({name, pageurl});

  newGameTile.save()
    .then(() => res.json('Game Tile added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;