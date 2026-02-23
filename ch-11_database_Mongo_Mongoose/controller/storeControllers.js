const Favourites = require("../Models/favourites");
const Home = require("../Models/home");


exports.getIndex = (req,res,next)=>
{
    Home.find().then((registeredHome)=>
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
    Home.find()
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
    Favourites.find()
    .populate('HouseId')
    .then((favourites)=>
    {
        const favourite_list = favourites.map(fav=>(fav.HouseId));

        
        res.render('store/favourite_list', 
        { 
            favourite_list,
            pageTitle : 'My Favourites' 
        });
    });
};

exports.AddToFavouriteList = (req,res,next)=>
{
    const homeId = req.body.homeId;

    Favourites.findOne({HouseId : homeId})
    .then((fav)=>
    {
        if(fav)
        {
            console.log("Already marked as favourites");
        }
        else
        {
            const fav = new Favourites({HouseId:homeId});
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
        }
    }).catch(err=>
    {
        console.log("Error while marking Favourites",err);
    });
};

exports.removeFromFavouriteList = (req,res,next)=>
{
    const id = req.params.id;
    
    Favourites.findOneAndDelete({HouseId:id})
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
    
    Home.findById(homeId).then(  (homeData)=>
    {
        console.log(homeData);
        
        res.render('store/home_details', 
        {
            home :homeData,
            pageTitle : 'Home-details' 
        });
    });
    
};
