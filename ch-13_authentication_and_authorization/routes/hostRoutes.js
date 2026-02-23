//core modules
const path = require('path');

//external module
const express = require('express');
const hostRoutes = express.Router();

//local module
const rootDir = require('../utils/pathUtils');
const hostControllers = require('../controller/hostControllers');

hostRoutes.get('/home',hostControllers.getHostHome);

hostRoutes.get('/add-home',hostControllers.getAddHome);
hostRoutes.post('/add-home',hostControllers.postHome);

hostRoutes.get('/edit_home/:homeId',hostControllers.getEditHome);
hostRoutes.post('/edit_home',hostControllers.postEditHome);

hostRoutes.post('/delete_home',hostControllers.postDeleteHome);


exports.hostRoutes = hostRoutes; 