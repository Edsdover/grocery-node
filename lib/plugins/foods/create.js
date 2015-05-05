'use strict';

var Food = require('../../models/food');
var Joi = require('joi');

exports.register = function(server, options, next){
 server.route({
  method: 'POST',
  path: '/foods',
  config: {
   description: 'Create a food item',
   validate: {
    payload: {
     name: Joi.string().required().min(2),
     aisle: Joi.string(),
     priority: Joi.string().required(),
     qty: Joi.number().required().min(1),
     photo: Joi.string()
    }
   },
   handler: function(request, reply){
    var food = new Food(request.payload);
    food.userId = request.auth.credentials._id;
    food.save(function(){
     return reply(food);
    });
   }
  }
 });
 return next();
};

exports.register.attributes = {
  name: 'foods.create'
};
