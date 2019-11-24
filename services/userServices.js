const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
  post,
  allPosts,
  logIn,
  signUp,
  logOut,
  myPosts
};

async function signUp(req, res) {
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
    res.status(400).send(err);
    return;
  } else {
    //PASS
    await User.findOne({ email: email })
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
                  res.send(user);
                  // res.json();
                })
                .catch(err => console.log(err));
            })
          );
        }
      })
      .catch(console.log(err));
  }
}
// {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }
async function logIn(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        // return done(null, false, { message: 'Email is not registered.' });
        res.send({ msg: '${email} is not registered. Sign up.' });
      } else {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            const token = jwt.sign({ id: user.id }, 'dasecepa', {
              expiresIn: '2h'
            });
            res.send({ token, user });
          } else {
            res.send({ msg: 'Wrong password.' });
          }
        });
      }
    })
    .catch(err => console.log(err));
}
async function logOut(req, res) {
  req.logOut();
  res.redirect('/login');
}

async function allPosts(req, res) {
  Post.find({}, (err, posts) => {
    res.send(posts);
  });
}
async function myPosts(req, res) {

  Post.find({ user : req.user.id }, (err, posts) => {
    
    res.send(posts);
  });
}

async function post(req, res) {
  const post = new Post({
    post: req.body.post,
    price: req.body.price,
    user: req.user.id
  });
  post
    .save()
    .then(post => {
      console.log(post);
      res.send(post);
    })
    .catch(err => console.log(err));
}
