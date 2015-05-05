'use strict';

var Food = require('../../models/food');
var Joi = require('joi');

exports.register = function(server, options, next){
 server.route({
  method: 'DELETE',
  path: '/foods/{foodId}',
  config: {
   description: 'Create a food item',
   validate: {
    params: {
     foodId: Joi.string().length(24)
    }
   },
   handler: function(request, reply){
    Food.findOne({_id: request.params.foodId, userId: request.auth.credentials._id}, function(err, food){
     if(!food){return reply().code(400);}

     food.remove(function(){
      return reply(food);
     });
    });
   }
  }
 });
 return next();
};

exports.register.attributes = {
  name: 'foods.destroy'
};
