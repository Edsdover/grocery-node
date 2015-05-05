'use strict';

var Food = require('../../models/food');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/foods',
    config: {
      description: 'Get all the foods by User',
      handler: function(request, reply){
        Food.find({userId: request.auth.credentials._id}, function(err, foods){
          return reply({foods: foods});
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'foods.index'
};
