const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { loggedIn } = require('../config/auth');

// User model
const User = require('./../models/User');
const Post = require('./../models/Post');

// Login route
router.get('/login', (req, res) => {
  res.send('Login');
});

// Register route
router.get('/register', (req, res) => {
  res.send('Register');
});

// Register handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let err = new Array();
  if (!name || !email || !password || !password2) {
    err.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    err.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    err.push({ msg: 'Password must be at least 6 characters' });
  }
  if (err.length > 0) {
    //TODO Send errors to front
    res.send(err);
  } else {
    //PASS
    // res.send('pass');
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          err.push({ msg: 'Email is alredy registred' });
          res.send(err);
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          //Hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  //redirecti to login
                  console.log('Redirecting to login');
                  res.send({ msg: 'registration complete' });
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            })
          );
        }
      })
      .catch(console.log(err));
  }
});

// Loging handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/users/login'
    // failureFlash : true
  })(req, res, next);
});

// Logout handle
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/users/login');
});

router.get('/posts', (req, res) => {
  Post.find({ user: req.user.id }, (err, posts) => {
    res.send(posts);
  });
});
// Post post
router.post('/posts/:id', (req, res) => {
  const post = new Post({
    post: req.body.post,
    price: req.body.price,
    user: req.params.id
  });
  post
    .save()
    .then(post => {
      console.log(post);
      res.send(post);
    })
    .catch(err => console.log(err));
});

// router.post('/posts', loggedIn, (req, res) => {
//   console.log(req.user.email);
// });

module.exports = router;
