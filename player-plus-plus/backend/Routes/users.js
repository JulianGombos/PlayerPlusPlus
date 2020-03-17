const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find() //find() will get a list of all the users on the mongoDB database results are returned in json format
    .then(users => res.json(users)) //res.json(users) is the statement that returns the users in json format
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//I added this myself. Not from tutorial
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(users => {
      users.username = req.body.username;

      users.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;