const Home = require("../Models/home");


exports.getIndex = (req,res,next)=>
{
    Home.fetchData((registeredHome)=>
    {
        res.render('store/', 
        { 
            registeredHome,
            pageTitle : 'Index' 
        });
    });
};
exports.getHomes = (req,res,next)=>
{
    Home.fetchData((registeredHome)=>
    {
        res.render('store/home_list', 
        { 
            registeredHome,
            pageTitle : 'Home' 
        });
    });
};
exports.getBookings = (req,res,next)=>
{
    
    res.render('store/booking', 
    { 
        pageTitle : 'My Bookings' 
    });
};

exports.getFavouriteList = (req,res,next)=>
{
    Home.fetchData((registeredHome)=>
    {
        res.render('store/favourite_list', 
        { 
            registeredHome,
        pageTitle : 'My Favourites' 
        });
    });
};


