//core modules
const path = require('path');

//external module
const express = require('express');

//Local modules
const storeRoutes = require('./routes/storeRoutes');
const {hostRoutes} = require('./routes/hostRoutes');
const homeController = require('./controller/errors');
const { default: mongoose } = require('mongoose');



 
const app = express();
app.set('view engine','ejs');
app.set('views','views');

app.use((req,res,next)=>
{
    console.log(req.url,req.method);
    next();
});
app.use(express.urlencoded());
app.use(storeRoutes);
app.use("/host",hostRoutes);
app.use(homeController.Error);

const PORT = 5000;
const MONGO_URL = "mongodb://localhost:27017/Airbnb3";

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

