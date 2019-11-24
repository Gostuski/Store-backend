const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);


const PostSchema = new mongoose.Schema({
  email:String,
  post: String,
  price: { type: Float},
  createTime: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const post = mongoose.model('Post', PostSchema, 'Posts');

module.exports = post;
