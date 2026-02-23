const http = require('http');
const fs = require('fs');


const server = http.createServer((req,res)=>
{
    console.log(req.url,req.method,req.headers);

    if(req.url=== '/' && req.method === 'GET')
    {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My first server</title></head>');
        res.write('<body><h1> welcome to my home page</h1><br>'); 
        res.write('<h1> Enter your details </h1><br>'); 
        res.write('<form action="/detail" method="POST"><br>')
        res.write('<input type="text" name="userName"></input><br>');
        
        res.write('<input type="radio" id="male" name="gender" value="male">');
        res.write('<label for="male">male</label><br>');
        
        res.write('<input type="radio" id="female" name="gender" value="female">');
        res.write('<label for="female">female</label><br>');

        res.write('<br><button type="submit">send</button></form>');
        res.write('</body>')
        res.write('</html>');
        return res.end();
    }
    else if(req.url.toLowerCase() === '/detail' && req.method === 'POST')
    {
        fs.writeFileSync('userDetail.txt', "hello world");
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    else if(req.url === '/contact')
    {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Contact</title></head>');
        res.write('<body><h1> contact me at meetritik@gmail.com </h1></body>')
        res.write('</html>');
        return res.end();
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Not Found</title></head>');
    res.write('<body><h1>Page not found</h1></body>')
    res.write('</html>');
    return res.end();
});

const PORT = 3000;
server.listen(PORT, ()=>
{
    console.log(`Server is running at http://localhost:${PORT}`);
});