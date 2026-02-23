//core module
const path = require('path');
const rootdir = require('./utils/pathUtils');

//external module
const express = require('express');
const MONGO_URL = "mongodb://localhost:27017/ToDo";
const cors = require('cors');
const { default: mongoose } = require('mongoose');

//local module
const { todoItemRouter } = require('./routes/todoItemRouter');

const app = express();

app.use((req,res,next)=>
{
    console.log(req.url,req.method);
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/todo' , todoItemRouter);
// app.use(authRoutes);
// app.use("/host",hostRoutes);
app.use('/' , (req,res,next)=>
{
    res.status(404).json({message: 'page not found'});
});

    
    

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

