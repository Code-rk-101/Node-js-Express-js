const Home = require("../Models/home");
const fs = require('fs');

exports.getAddHome = (req,res,next)=>
{
    res.render('host/addHome', 
        {
            pageTitle: 'Add-Home',
            editing:false,
            isLoggedin: req.isLoggedin,
            user: req.session.user,
        });
};
exports.getHostHome = (req,res,next)=>
{
    Home.find().then((registeredHome)=>
    {
        res.render('host/hostHomeList', 
        { 
            registeredHome,
            pageTitle : 'Home' ,
            isLoggedin: req.isLoggedin,
            user: req.session.user,
        });
    });
};

exports.postHome = (req,res,next)=>
{
    const {HouseName,price,location,rating,description} = req.body;

    console.log(HouseName,price,location,rating,description);
    if(!req.files)
    {
        return console.log('documents are not in proper foramt');
    }
    console.log(req.files);
    const image = req.files['image']?.[0]?.path;
    const rules = req.files['rules']?.[0]?.path;
     
    

    const home = new Home({HouseName,price,location,rating,image,rules,description});
    
    home.save().then(()=>
    {
        console.log("home saved successfully");
        res.redirect('/host/home');
    }).catch(err => {
        console.log("Error saving home:", err);
        res.redirect('/host/add-home');
    });

    
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
                isLoggedin: req.isLoggedin,
                user: req.session.user,
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
    const {id,HouseName,price,location,rating,description} = req.body;
    
    Home.findById(id)
    .then((home)=>
    {
        home.HouseName = HouseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.description = description;

        if(req.files && req.files['image'])
        {
            fs.unlink(home.image,(err)=>
            {
                if(err)
                    throw err;
            });
            home.image = req.files['image'][0].path;
        }
        

        if(req.files && req.files['rules'])
        {
            fs.unlink(home.rules,(err)=>
            {
                if(err)
                    throw err;
            });
            home.rules = req.files['rules'][0].path;
        }

        home.save().then(result=>
        {
            console.log("home updated :",result);
            res.redirect('/host/home');
        })
        .catch(err=>
        {
            console.log("Error while saving the updated data : ",err);
            res.redirect('/host/home');
        });
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

