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
    const {HouseName,price,location,rating,photoUrl} = req.body;
    const home = new Home(HouseName,price,location,rating,photoUrl);
    console.log("home added");
    home.save();

    res.redirect('/host/home');
};

exports.getEditHome = (req,res,next)=>
{
    const homeId = req.params.homeId;
    const editing = req.query.editing === "true";
    
    Home.fetchDataById(homeId,(home)=>
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
    const {id,HouseName,price,location,rating,photoUrl} = req.body;
    const home = new Home(HouseName,price,location,rating,photoUrl);
    home.id = id;

    home.save();

    res.redirect('/host/home');
};

exports.postDeleteHome = (req,res,next)=>
{
    const homeId = req.body.id;
    Home.deleteById(homeId, (err)=>
    {
        if(err)
            console.log("error :",err);
        res.redirect('/host/home');
    });
};

