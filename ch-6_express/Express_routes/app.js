const express = require('express');
const userRoutes = require('./routes/userRoutes');
const hostRoutes = require('./routes/hostRoutes')
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
    res.status(404).send(
        `
            <h1> 404 Page not found</h1>
        `
    );
});

const PORT = 4000;
app.listen(PORT,()=>
{
    console.log(`server is running on http://localhost:${PORT}`);
})