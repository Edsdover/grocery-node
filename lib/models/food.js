'use strict';

var Mongoose = require('mongoose');

var foodSchema = Mongoose.Schema({
  name: {type: String, required: true},
  aisle : {type: String},
  priority : {type: String, required: true},
  qty : {type: Number, required: true},
  photo : {type: String},
  userId : {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
  createdAt : {type: Date, required: true, default: Date.now},
  isPicked : {type: Boolean, required: true, default: false}
});

var Food = Mongoose.model('Food', foodSchema);
module.exports = Food;
