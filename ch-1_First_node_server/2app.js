const http = require('http');

const server = http.createServer((req,res)=>
{
    console.log(req.url,req.method,req.headers);

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first server</title></head>');
    if(req.url=== '/')
    {
        res.write('<body><h1> welcome to my home page</h1></body>')
        res.write('</html>');
        return res.end();
    }
    else if(req.url === '/contact')
    {
        res.write('<body><h1> contact me at meetritik@gamil.com </h1></body>')
        res.write('</html>');
        return res.end();
    }
    res.write('<body><h1> welcome to my first server response</h1></body>')
    res.write('</html>');
    return res.end();
});

const PORT = 3000;
server.listen(PORT, ()=>
{
    console.log(`Server is running at http://localhost:${PORT}`);
});