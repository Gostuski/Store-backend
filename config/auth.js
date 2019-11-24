const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
module.exports = {

    loggedIn : function (req, res, next) {
        if (req.user) {
            console.log('dada');
            next();
        } else {
            res.redirect('/login');
        }
    },
    authenticated : function (req, res, next) {
        const decoded = jwt.verify(req.get('X-jwt-token'), 'dasecepa');
      
        User.findById(decoded.id, (err, user) => {
          if (err) {
            return res.status(400).json({
              message: 'An error has occured.'
            });
          }
          if (!user) {
            return res.status(401).json({
              message: 'Unauthorized.'
            });
          }
          req.user = user;
          next();
        })
      }
}