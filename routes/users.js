const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('./../models/User');

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
  console.log(req.body);
  const { name, email, password, password2 } = req.body;
  let err = new Array();
  if (!name || !email || !password || !password2) {
    err.push({ msg: 'Please fill in all fields' });
  }
  if (password !== password2) {
    err.push({ msg: 'Passwords do not match ' });
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
    User.findOne({ email: email }).then(user => {
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
                res.send({msg : 'registration complete'})
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

// Loging handle

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect : '/users/register',
    failureRedirect : '/users/login',
    // failureFlash : true
  })(req, res, next);
});

// Logout handle 
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/users/login');
});

module.exports = router;
