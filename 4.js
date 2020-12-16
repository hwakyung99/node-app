var mysql = require('mysql');
var http = require('http');
var url = require('url');
var connection = mysql.createConnection({
    host: 'database-1.cdbrt00yi2pz.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '11111111',
    database: 'mydb'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    connection.query('select * from topic', function (error, results, fields) {
        var list = "";
        for (var i = 0; i < results.length; i++) {
            list += `<li><a href="?id=${results[i].id}">${results[i].title}</a></li>`;
        }
        var content = "";
        if (queryData.id === undefined) {
            content = "<h2>Welcome</h2>Hello WEB!";
            response.end(`
                <h1><a href="index.html">WEB</a></h1>
                <ul>
                    ${list}
                </ul>
                <h2>Welcome</h2>
                Hello WEB!!    
            `);
        } else {
            connection.query(`SELECT * FROM topic WHERE id="${queryData.id}"`, function (error, results) {
                console.log(results);
                response.end(`
                    <h1><a href="index.html">WEB</a></h1>
                    <ul>
                        ${list}
                    </ul>
                    <h2>${results[0].title}</h2>
                    ${results[0].description}
                `);
            })
        }
    });
});
app.listen(80);
