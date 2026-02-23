//core module
const path = require('path');

const express = require('express');
const userRoutes = express.Router();

userRoutes.get("/",(req,res,next)=>
{
    res.sendFile(path.join(__dirname,'../','views','home.html'));
});

module.exports = userRoutes;