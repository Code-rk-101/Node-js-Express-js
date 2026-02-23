const Home = require("../Models/home");

exports.getHome = (req,res,next)=>
{
    res.render('host/addHome', {pageTitle: 'Add-Home'});
};
exports.getHostHome = (req,res,next)=>
{
    Home.fetchData((registeredHome)=>
    {
        res.render('host/hostHomeList', 
        { 
            registeredHome,
            pageTitle : 'Home' 
        });
    });
};

exports.postHome = (req,res,next)=>
{
    console.log(req.body);

    const {HouseName,price,location,rating,photoUrl} = req.body;
    const home = new Home(HouseName,price,location,rating,photoUrl);
    home.save();

    res.render('host/homeAdded', {pageTitle : 'Add-Home'});
};
