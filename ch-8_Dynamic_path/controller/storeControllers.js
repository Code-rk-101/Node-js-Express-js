const Favourites = require("../Models/favourites");
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
    Favourites.getFavourites((favourites)=>
    {
        Home.fetchData((registeredHomes)=>
        {
            const favourite_list = registeredHomes.filter((home)=>(
                favourites.includes(home.id)
            ));
            
            res.render('store/favourite_list', 
            { 
                favourite_list,
                pageTitle : 'My Favourites' 
            });
        });
        // favourites.map(fav=>
        // {
        //     Home.fetchDataById(fav,(homeData)=>
        //     {
        //         favourite_list = [];
        //         favourite_list.push(homeData);
        //     });
        // });
    });
};

exports.AddToFavouriteList = (req,res,next)=>
{
    Favourites.addToFavourite(req.body.homeId, (err)=>
    {
        if(err)
        {
            console.log("Error : ",err);
            res.redirect('/favourite_list');
        }
        else
        {
            res.redirect('/favourite_list');
        }
    })
    
    // Home.fetchData((registeredHome)=>
    // {
    //     res.render('store/favourite_list', 
    //     { 
    //         registeredHome,
    //         pageTitle : 'My Favourites' 
    //     });
    // });
};

exports.removeFromFavouriteList = (req,res,next)=>
{
    const id = req.params.id;
    
    Favourites.removeFromFavouriteList(id, (err)=>
    {
        if(err)
        {
            console.log("Problem during removing from favourites Error : ",err);
            res.redirect('/favourite_list');
        }
        else
        {
            res.redirect('/favourite_list');
        }
    });
};

exports.getHomeDetails = (req,res,next)=>
{
    const homeId = req.params.id;
    
    Home.fetchDataById(homeId , (homeData)=>
    {
        res.render('store/home_details', 
        {
            home :homeData,
            pageTitle : 'Home-details' 
        });
    });
    
};
