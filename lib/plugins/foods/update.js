'use strict';

var Food = require('../../models/food');
var Joi = require('joi');

exports.register = function(server, options, next){
 server.route({
  method: 'PUT',
  path: '/foods/{foodId}',
  config: {
   description: 'Edit a food item',
   validate: {
    params: {
     foodId: Joi.string().length(24)
    }
   },
   handler: function(request, reply){
    Food.findOne({_id: request.params.foodId, userId: request.auth.credentials._id}, function(err, food){
     if(!food){return reply().code(400);}
     food.isPicked = request.payload.isPicked;
     food.save(function(){
      return reply(food);
     });
    });
    // if(request.auth.credentials._id){
    //  var isPicked = request.payload.isPicked;
    //  request.payload.isPicked = !request.payload.isPicked;
    //  console.log('request.payload.isPicked' ,request.payload.isPicked);
    //  Food.findByIdAndUpdate(request.auth.credentials._id, request.payload, function(err, isPicked){
    //   if(err){
    //    return reply(JSON.stringify(err)).code(400);
    //   }else{
    //    console.log('food: ', isPicked);
    //    return reply(isPicked);
    //   }
    //
    //  });
    // }
   }
  }
 });

 return next();
};

exports.register.attributes = {
 name: 'foods.update'
};
