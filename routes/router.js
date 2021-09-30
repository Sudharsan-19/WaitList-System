const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/controller');

// /admin route GET method
route.get('/admin', services.homeRoutes);

// /add_user route GET method
route.get('/add-user', services.add_user);

// /update_user route GET method
route.get('/update-user', services.update_user);


// api users 
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// export route
module.exports = route