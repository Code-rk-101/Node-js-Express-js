const Home = require("../Models/home");

exports.getAddHome = (req,res,next)=>
{
    res.render('host/addHome', 
        {
            pageTitle: 'Add-Home',
            editing:false,
        });
};
exports.getHostHome = (req,res,next)=>
{
    Home.find().then((registeredHome)=>
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
    const {HouseName,price,location,rating,photoUrl,description,} = req.body;

    const home = new Home({HouseName,price,location,rating,photoUrl,description});
    console.log("home added");
    home.save().then(()=>
    {
        console.log("home saved successfully");
    });

    res.redirect('/host/home');
};

exports.getEditHome = (req,res,next)=>
{
    const homeId = req.params.homeId;
    const editing = req.query.editing === "true";
    
    Home.findById(homeId).then((home)=>
    {
        if(home)
        {
            res.render('host/addHome', 
            {
                pageTitle: 'Edit-Home-details',
                editing,
                homeId,
                home,
            });
        }
        else
        {
            console.log("Home not found for editing ");
            return res.redirect("/host/home")
        }
    });
};

exports.postEditHome = (req,res,next)=>
{
    const {id,HouseName,price,location,rating,photoUrl,description} = req.body;
    
    Home.findById(id)
    .then((home)=>
    {
        home.HouseName = HouseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.photoUrl = photoUrl;
        home.description = description;

        home.save().then(result=>
        {
            console.log("home updated :",result);
        })
        .catch(err=>
        {
            console.log("Error while saving the updated data : ",err);
            
        });
        res.redirect('/host/home');
    }).catch(err=>
    {
        console.log("Error while finding the home : ",err);
    });
};

exports.postDeleteHome = (req,res,next)=>
{
    const homeId = req.body.id;
    Home.findByIdAndDelete(homeId).then(()=>
    {
        res.redirect('/host/home');
    })
    .catch((err)=>
    {
        if(err)
            console.log("error :",err);
    });
};

