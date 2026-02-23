const fs = require('fs');
// const { buffer } = require('stream/consumers');

const requestHandler = (req,res)=>
{
    if(req.url=== '/' && req.method === 'GET')
    {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My first server</title></head>');
        res.write('<body><h1> welcome to my home page</h1><br>'); 

        res.write('<h1> Enter your details </h1><br>'); 
        res.write('<form action="/detail" method="POST"><br>');
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
        // res.setHeader('Content-Type', 'text/html');
        // res.write('<html>');
        // res.write('<head><title>My first server</title></head>');
        // res.write('<body><h1> welcome to my home page</h1><br>'); 

        const body = [];
        req.on('data', (chunk)=>
        {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', ()=>
        {
            const fullbody = Buffer.concat(body).toString();
            const params = new URLSearchParams(fullbody);
            console.log(params);

            //const bodyObj = {};
            // for(const[key,value] of params.entries())
            // {
            //     bodyObj[key] = value;
            // }
            const bodyObj = Object.fromEntries(params);
            console.log(bodyObj);
            fs.writeFileSync('userDetail.txt', JSON.stringify(bodyObj));
        });
        
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first server</title></head>');
    res.write('<body><h1>Page not found</h1></body>')
    res.write('</html>');
    return res.end();
}

module.exports = requestHandler;