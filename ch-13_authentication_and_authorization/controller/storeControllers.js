const Favourites = require("../Models/favourites");
const Home = require("../Models/home");
const User = require("../Models/user");


exports.getIndex = (req,res,next)=>
{
    Home.find().then((registeredHome)=>
    {
        res.render('store/', 
        { 
            registeredHome,
            pageTitle : 'Index',
            isLoggedin: req.isLoggedin, 
            user: req.session.user,
        })
    });
};
exports.getHomes = (req,res,next)=>
{
    Home.find()
    .then((registeredHome)=>
    {
        res.render('store/home_list', 
        { 
            registeredHome,
            pageTitle : 'Home',
            isLoggedin: req.isLoggedin,
            user: req.session.user,
        })
    });
};
exports.getBookings = (req,res,next)=>
{
    
    res.render('store/booking', 
    { 
        pageTitle : 'My Bookings',
        isLoggedin: req.isLoggedin,
        user: req.session.user, 
    });
};

exports.getFavouriteList = async (req,res,next)=>
{
    if(req.isLoggedin)
    {
        const userId = req.session.user._id;
        const currentUser = await User.findById(userId).populate('favourites');
        res.render('store/favourite_list', 
        { 
            favourite_list: currentUser.favourites,
            pageTitle : 'My Favourites',
            isLoggedin: req.isLoggedin,
            user: req.session.user, 
        });
    }
    else
    {
        res.redirect("/login");
    }
};

exports.AddToFavouriteList = async (req,res,next)=>
{
    if(req.isLoggedin)
    {
        try
        {
            const homeId = req.body.homeId;
            const userId = req.session.user._id;
            const currentUser = await User.findById(userId);
            if(currentUser.favourites.includes(homeId))
            {
                console.log("Already marked as favourites");
            }
            else
            {
                currentUser.favourites.push(homeId);
                await currentUser.save();
            }
            res.redirect('/favourite_list');
        }
        catch(err)
        {
            console.log("Error while marking Favourites",err);
        };
    }
    else
    {
        res.redirect("/login");
    }
    
};

exports.removeFromFavouriteList = async (req,res,next)=>
{
    try
    {
        const id = req.params.id;
        const userId = req.session.user._id;
        const currentUser = await User.findById(userId);
        if(currentUser.favourites.includes(id))
        {
            currentUser.favourites = currentUser.favourites.filter(fav=>fav.toString() != id);
            await currentUser.save();  
        }
    }
    catch(err)
    {
        console.log("Error : ",err);
    }
    res.redirect('/favourite_list');
};

exports.getHomeDetails = (req,res,next)=>
{
    const homeId = req.params.id;
    
    Home.findById(homeId).then(  (homeData)=>
    {
        console.log(homeData);
        
        res.render('store/home_details', 
        {
            home :homeData,
            pageTitle : 'Home-details' ,
            isLoggedin: req.isLoggedin,
            user: req.session.user,
        });
    });
    
};
