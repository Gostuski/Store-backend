const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function(passport) {
  const authenticate = (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user)
          return done(null, false, { message: 'Email is not registered.' });
        //Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect.' });
          }
        });
      })
      .catch(err => console.log(err));
  };
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticate));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    }); 
  });
};

