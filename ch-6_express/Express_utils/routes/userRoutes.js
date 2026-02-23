//core module
const path = require('path');

// external module
const express = require('express');
const userRoutes = express.Router();

// local module
const rootDir = require('../utils/pathUtils')
userRoutes.get("/",(req,res,next)=>
{
    res.sendFile(path.join(rootDir,'views','home.html'));
});

module.exports = userRoutes;