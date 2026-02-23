//core modules
const path = require('path');

//external module
const express = require('express');
const hostRoutes = express.Router();

//local module
const rootDir = require('../utils/pathUtils');

hostRoutes.get('/add-home',(req,res,next)=>
{
    res.render('addHome', {pageTitle: 'Add-Home'});
});
const registeredHome = [];
hostRoutes.post('/add-home',(req,res,next)=>
{
    console.log(req.body.HouseName);
    registeredHome.push(req.body.HouseName);
    res.render('homeAdded', {pageTitle : 'Add-Home'});
});

exports.hostRoutes = hostRoutes;
exports.registeredHome = registeredHome;