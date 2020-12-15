var http = require('http');
var app = http.createServer(function(request,response){
    var content = Math.random();
    response.end(`
    <h1><a href="index.html">WEB</a></h1>
    <ul>
        <li><a href="html.html">html</a></li>
        <li><a href="nodejs.html">nodejs</a></li>
        <li><a href="mysql.html">mysql</a></li>
    </ul>
    <h2>Welcome</h2>
    ${content}    
    `);
});
app.listen(80);
