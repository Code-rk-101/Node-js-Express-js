//core modules
// const path = require('path');

//external module
const express = require('express');

//Local modules
const storeRoutes = require('./routes/storeRoutes');
const {hostRoutes} = require('./routes/hostRoutes');
const homeController = require('./controller/errors')

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

const PORT = 25000;
app.listen(PORT,()=>
{
    console.log(`server is running on http://localhost:${PORT}`);
})