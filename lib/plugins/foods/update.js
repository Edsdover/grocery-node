'use strict';

var Food = require('../../models/food');
// var Joi = require('joi');

exports.register = function(server, options, next){
 server.route({
  method: 'PUT',
  path: '/foods',
  config: {
   description: 'Edit a food item',
   // validate: {
   //  payload: {
   //   name: Joi.string().required().min(2),
   //   aisle: Joi.string(),
   //   priority: Joi.string().required(),
   //   qty: Joi.number().required().min(1),
   //   photo: Joi.string(),
   //   isPicked: Joi.boolean()
   //  }
   // },
   handler: function(request, reply){
    if(request.auth.credentials._id){
     var isPicked = request.payload.isPicked;
     request.payload.isPicked = !request.payload.isPicked;
     console.log('request.payload.isPicked' ,request.payload.isPicked);
     Food.findByIdAndUpdate(request.auth.credentials._id, request.payload, function(err, isPicked){
      if(err){
       return reply(JSON.stringify(err)).code(400);
      }else{
       console.log('food: ', isPicked);
       return reply(isPicked);
      }

     });
    }
   }
  }
 });

 return next();
};

exports.register.attributes = {
 name: 'foods.update'
};
