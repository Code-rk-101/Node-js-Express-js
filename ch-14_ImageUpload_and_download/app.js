//core module
const path = require('path');
const rootdir = require('./utils/pathUtils');

//external module
const crypto = require('crypto');
const express = require('express');
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGO_URL = "mongodb://localhost:27017/Airbnb2";
const multer = require('multer');
const { default: mongoose } = require('mongoose');


//Local modules
const storeRoutes = require('./routes/storeRoutes');
const {hostRoutes} = require('./routes/hostRoutes');
const authRoutes = require('./routes/authRoutes');
const homeController = require('./controller/errors');


const randomString = ()=>
{
    return crypto.randomBytes(8).toString('hex');
}
const storage = multer.diskStorage(
{
    destination: (req,file,cb)=>
    {
        if(file.fieldname === 'image')
        {
            cb(null,'uploads/images');
        }   
        else if(file.fieldname === 'rules')
        {
            cb(null,'uploads/rules');
        }
        else
        {
            cb(null,false);
        }
    },
    filename:(req,file,cb)=>
    {
        if(file.fieldname === 'image')
        {
            cb(null,randomString() + '-'+file.originalname);
        }   
        else if(file.fieldname === 'rules')
        {
            cb(null,'rules' + '-'+randomString()+ '-'+file.originalname);
        }
        else
        {
            cb(null,false);
        }
    }
});

const fileFilter = (req,file,cb)=>
{
    if(file.fieldname === 'image' && ['image/jpeg','image/jpg','image/png'].includes(file.mimetype))
    {
        cb(null,true);
    }
    else if(file.fieldname === 'rules' && ['application/pdf'].includes(file.mimetype))
    {
        cb(null,true);
    }
    else 
    {
        cb(null,false);
    }
};

const multerOption = 
{
   storage,
   fileFilter
}


const app = express();
app.set('view engine','ejs');
app.set('views','views');

const store = new MongoDBStore(
{
    uri: MONGO_URL,
    collection: "sessions"
});

app.use((req,res,next)=>
{
    console.log(req.url,req.method);
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOption).fields(
[
    {name:'image',maxCount:1},
    {name:'rules',maxCount:1}
]));
app.use('/uploads',express.static(path.join(rootdir,'uploads')));
app.use('/host/uploads',express.static(path.join(rootdir,'uploads')));
app.use('/home/uploads',express.static(path.join(rootdir,'uploads')));

app.use(session(
{
    secret: "airbnb 456",
    resave: false,
    saveUninitialized: true,
    store: store,
}));

app.use((req,res,next)=>
{
    // console.log("session value : ",req.session);
    req.isLoggedin = req.session.isLoggedin;
    next();
});

app.use("/host" ,(req,res,next)=>
{
    if(req.isLoggedin)
    {
        next();
    }
    else
    {
        return res.redirect("/login");
    }
});

app.use(storeRoutes);
app.use(authRoutes);
app.use("/host",hostRoutes);
app.use(homeController.Error);

const PORT = 5000;
mongoose.connect(MONGO_URL)
.then(()=>
{
    console.log("Connected to Mongoose");
    app.listen(PORT,()=>
    {
        console.log(`server is running on http://localhost:${PORT}`);
    });
})
.catch((err)=>
{
    console.log("Error while connecting to Mongoose : ",err);
})

