const express = require('express');
const userRoutes = express.Router();

userRoutes.get("/",(req,res,next)=>
{
    res.send(
    `
        <h1> Welcome to Airbnb</h1>
        <a href="/host/add-home">add home</a>
    `);
});

module.exports = userRoutes;