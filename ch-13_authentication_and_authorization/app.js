//external module
const express = require('express');
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGO_URL = "mongodb://localhost:27017/Airbnb3";

//Local modules
const storeRoutes = require('./routes/storeRoutes');
const {hostRoutes} = require('./routes/hostRoutes');
const authRoutes = require('./routes/authRoutes');
const homeController = require('./controller/errors');
const { default: mongoose } = require('mongoose');



 
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

