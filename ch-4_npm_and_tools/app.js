const http = require('http');

const server = http.createServer((req,res)=>
{
    console.log(req);
    
});

const PORT = 3100;

server.listen(PORT, ()=>
{
    console.log(`Server is running at http://localhost:${PORT}`);
});