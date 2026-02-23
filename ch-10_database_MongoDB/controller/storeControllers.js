const Favourites = require("../Models/favourites");
const Home = require("../Models/home");


exports.getIndex = (req,res,next)=>
{
    Home.fetchData().then((registeredHome)=>
    {
        res.render('store/', 
        { 
            registeredHome,
            pageTitle : 'Index' 
        })
    });
};
exports.getHomes = (req,res,next)=>
{
    Home.fetchData()
    .then((registeredHome)=>
    {
        res.render('store/home_list', 
        { 
            registeredHome,
            pageTitle : 'Home' 
        })
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
    Favourites.getFavourites()
    .then((favourites)=>
    {
        favourites = favourites.map(fav=>(fav.HouseId));

        Home.fetchData()
        .then((registeredHomes)=>
        {
            const favourite_list = registeredHomes.filter((home)=>(
                favourites.includes(home._id.toString())
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
    const homeId = req.body.homeId;
    const fav = new Favourites(homeId);
    fav.save().then((result)=>
    {
        console.log("Fav added : ",result);
        res.redirect('/favourite_list');
    })
    .catch((err)=>
    {
        console.log("Error : ",err);
        res.redirect('/favourite_list');
    });
};

exports.removeFromFavouriteList = (req,res,next)=>
{
    const id = req.params.id;
    
    Favourites.removeFromFavouriteList(id)
    .then(result=>
    {
        console.log("Fav removed : ",result);
    })
    .catch((err)=>
    {
        console.log("Error : ",err);
    })
    .finally(()=>
    {
        res.redirect('/favourite_list');   
    })
};

exports.getHomeDetails = (req,res,next)=>
{
    const homeId = req.params.id;
    
    Home.fetchDataById(homeId).then(  (homeData)=>
    {
        console.log(homeData);
        
        res.render('store/home_details', 
        {
            home :homeData,
            pageTitle : 'Home-details' 
        });
    });
    
};
