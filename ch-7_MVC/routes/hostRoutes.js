//core modules
const path = require('path');

//external module
const express = require('express');
const hostRoutes = express.Router();

//local module
const rootDir = require('../utils/pathUtils');
const hostControllers = require('../controller/hostControllers');

hostRoutes.get('/add-home',hostControllers.getHome);
hostRoutes.post('/add-home',hostControllers.postHome);
hostRoutes.get('/home',hostControllers.getHostHome);

exports.hostRoutes = hostRoutes; 