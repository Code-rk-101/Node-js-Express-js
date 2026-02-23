//core modules
const path = require('path');

//external module
const express = require('express');
const hostRoutes = express.Router();

//local module
const rootDir = require('../utils/pathUtils');

hostRoutes.get('/add-home',(req,res,next)=>
{
    res.sendFile(path.join(rootDir,'views','addHome.html'));
});

hostRoutes.post('/add-home',(req,res,next)=>
{
    console.log(req.body);
    
    res.sendFile(path.join(rootDir,'views','homeAdded.html'));
});

module.exports = hostRoutes;