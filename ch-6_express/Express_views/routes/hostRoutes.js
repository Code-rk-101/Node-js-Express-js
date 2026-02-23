//core modules
const path = require('path');

const express = require('express');
const hostRoutes = express.Router();

hostRoutes.get('/add-home',(req,res,next)=>
{
    res.sendFile(path.join(__dirname,'../','views','addHome.html'));
});

hostRoutes.post('/add-home',(req,res,next)=>
{
    console.log(req.body);
    
    res.sendFile(path.join(__dirname,'../','views','homeAdded.html'));
});

module.exports = hostRoutes;