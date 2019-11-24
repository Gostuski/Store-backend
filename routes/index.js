const express = require('express');

const router = express.Router();
const { authenticated } = require('../config/auth');

const user = require('../services/userServices');

router.get('/', authenticated, user.allPosts);

// Login route
router.get('/login', (req, res) => {
  //TODO login page
  res.send('Login');
});

// Register route
router.get('/register', (req, res) => {
  //TODO register page 
  res.send('Register');
});

// Register handle
router.post('/register', user.signUp);

// Loging handle
router.post('/login', user.logIn);

// Logout handle
router.get('/logout', authenticated, user.logOut);

router.get('/posts', authenticated, user.allPosts);

router.get('/myposts', authenticated, user.myPosts);

// Post post
router.post('/posts', authenticated, user.post);


module.exports = router;
