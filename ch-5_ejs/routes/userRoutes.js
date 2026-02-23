//core module
const path = require('path');

// external module
const express = require('express');
const userRoutes = express.Router();

// local module
const rootDir = require('../utils/pathUtils')
const {registeredHome } = require('./hostRoutes');

userRoutes.get("/",(req,res,next)=>
{
    res.render('home', { 
        registeredHome,
    pageTitle : 'Home' });
});

module.exports = userRoutes;