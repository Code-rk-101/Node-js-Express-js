const express = require('express');
const hostRoutes = express.Router();

hostRoutes.get('/add-home',(req,res,next)=>
{
    res.send(
        `
            <h1> Register your home</h1>
            <form action="/host/add-home" method="POST"><br>
            <label for="HouseName">Enter your House Name</label><br>
            <input type="text" id="HouseName" name="HouseName" placeholder="HouseName..."></input><br><br>

            <br><br><button type="submit">send</button>
            </form>
        `
    );
});

hostRoutes.post('/add-home',(req,res,next)=>
{
    console.log(req.body);
    
    res.send(
        `
            <h1> Home added sucessfully </h1>
            <a href="/">go to home</a>
        `
    );
});

module.exports = hostRoutes;