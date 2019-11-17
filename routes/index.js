const express = require('express');

const router = express.Router();
const { loggedIn } = require('../config/auth');

// // signup route
// router.post('/signup', val.user.signup, user.signup);

// // login route
// router.post('/login', val.user.loginMobile, user.login);

// // home route
// router.get('/tweets', auth.isAuthc, user.listTweets);

// // profile route
// router.get('/profile/:id', auth.isAuthc, user.myTweets);

// // get profile route
// router.get('/user', auth.isAuthc, user.myProfile);

// // tweet route
// router.post('/tweet', auth.isAuthc, val.user.tweet, user.tweet);

// // retweet route
// router.post('/retweet', auth.isAuthc, val.user.tweetId, user.retweet);

router.get('/', loggedIn, (req, res) => {
  res.send('Welcome');
});

// router.get('/homepage', loggedIn, (req, res) => {
//   res.send('homepage');
// });

module.exports = router;
