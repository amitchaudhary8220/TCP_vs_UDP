const http2 = require('http2');
const fs = require('fs');
const path = require('path');

// Load self-signed certificate and key
const server = http2.createSecureServer({
    key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'localhost-cert.pem'))
});

server.on('stream', (stream, headers) => {
    console.log('Request received:', headers[':path']);

    stream.respond({
        'content-type': 'text/plain',
        ':status': 200
    });

    stream.end(`Hello! You requested ${headers[':path']}`);
});

server.listen(8443, () => {
    console.log('HTTP/2 server running at https://localhost:8443');
});
