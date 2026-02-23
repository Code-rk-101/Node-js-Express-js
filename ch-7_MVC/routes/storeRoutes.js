//core module
const path = require('path');

// external module
const express = require('express');
const storeRoutes = express.Router();

// local module
// const rootDir = require('../utils/pathUtils')
// const {registeredHome } = require('./hostRoutes');
const storeControllers = require('../controller/storeControllers');

storeRoutes.get("/",storeControllers.getIndex);
storeRoutes.get("/home",storeControllers.getHomes);
storeRoutes.get("/Bookings",storeControllers.getBookings);
storeRoutes.get("/favourite_list",storeControllers.getFavouriteList);

module.exports = storeRoutes;