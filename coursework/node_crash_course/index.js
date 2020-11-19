const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // if (req.url === '/') {
    //     fs.readFile(
    //         path.join(__dirname, 'public', 'index.html'),
    //         (err, content) => {
    //             res.writeHead(200, { 'Content-Type': 'text/html' })
    //             res.end(content);
    //         })
    // }

    // else if (req.url === '/api/users') {
    //     const users = [
    //         { name : "Bob", age : 40},
    //         { name : "Alice", age : 38},
    //         { name : "Charlie", age : 37}
    //     ];
    //     res.writeHead(200, 
    //         {'Content-Type' : 'application/json'});
    //     res.end(JSON.stringify(users));
    // }

    // else {
    //     res.writeHead(404, "not found");
    //     res.end();
    // }

    // Build file path
    let filePath = path.join(__dirname, 'public',
        req.url == '/' ? 'index.html' : req.url);

    let extName = path.extname(filePath);

    if ( extName == '')
        filePath.extName = '.html';
        

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set sontent type
    switch (extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpg';
            break;

    }

    // Read File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');

                })

            } else { // not a content error, server error probably
                res.writeHead(500);
                res.end(`Server error ${err.code} `);

            }
        }
        else { // no error
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    })




});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));