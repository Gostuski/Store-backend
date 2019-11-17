const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const app = express();
  const { loggedIn } = require('./config/auth');

// Passport config
require('./config/passport')(passport);

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


// Mongo connection link
const db = require('./config/keys').MongoURI;

// Mongo connect
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo db connected'))
  .catch(() => console.log('Error connecting to mongo db'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server starte on port : ${PORT}`));

// Routes
app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

app.get('/homepage', loggedIn, function(req, res, next) {
  console.log('proso');
  res.send('welcome');
  // passport.authenticate('local', function(err, user, info) {
  //   if (err) { return next(err); }
  //   if (!user) { return res.redirect('/users/login'); }
  //   req.logIn(user, function(err) {
  //     if (err) { return next(err); }
  //     console.log('nije err');
  //     return res.redirect('/');
  //   });
  // })(req, res, next);
});

