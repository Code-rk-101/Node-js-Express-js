//exrenal module
const express = require('express');

//local module
const requestHandler = require('./handler');

const app = express();

app.get('/',(req,res,next)=>
{
    console.log("entred in first middleware");
    next();
});

app.use('/',(req,res,next)=>
{
    console.log("entred in second middleware");
    next();
});

app.post("/submit",(req,res,next)=>
{
    console.log("entred in submit middleware");
    res.send('<p>The response is sent</p>')
});


const PORT = 3000;
app.listen(PORT, ()=>
{
    console.log(`Server is running at http://localhost:${PORT}`);
})