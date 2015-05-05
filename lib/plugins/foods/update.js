'use strict';

var Food = require('../../models/food');
var Joi = require('joi');

exports.register = function(server, options, next){
 server.route({
  method: 'PUT',
  path: '/foods/{foodId}',
  config: {
   description: 'Toggle a food item',
   validate: {
    params: {
     foodId: Joi.string().length(24)
    }
   },
   handler: function(request, reply){
    Food.findOne({_id: request.params.foodId, userId: request.auth.credentials._id}, function(err, food){
     if(!food){return reply().code(400);}
     else if (food.isPicked !== request.payload.isPicked){
      food.isPicked = request.payload.isPicked;
     } else {
      food.name = request.payload.name;
      food.aisle = request.payload.aisle;
      food.priority = request.payload.priority;
      food.qty = request.payload.qty;
      food.photo = request.payload.photo;
      food.isPicked = request.payload.isPicked;
     }
     food.save(function(){
      return reply(food);
     });
    });
   }
  }
 });

 return next();
};

exports.register.attributes = {
 name: 'foods.update'
};
