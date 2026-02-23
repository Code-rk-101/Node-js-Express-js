//core modules
const path = require('path');

//external module
const express = require('express');

//Local modules
const userRoutes = require('./routes/userRoutes');
const hostRoutes = require('./routes/hostRoutes');
const rootDir = require('./utils/pathUtils');

const app = express();

app.use((req,res,next)=>
{
    console.log(req.url,req.method);
    next();
});
app.use(express.urlencoded());
app.use(userRoutes);
app.use("/host",hostRoutes);
app.use((req,res,next)=>
{
    res.status(404).sendFile(path.join(rootDir,'views','404.html'));
});

const PORT = 4000;
app.listen(PORT,()=>
{
    console.log(`server is running on http://localhost:${PORT}`);
})