const net = require('net');

const server = net.createServer(socket => { //net.createServer: Creates a TCP server.
    socket.write("connection is created with HTTP/1.1");  //socket.write: Sends data to client.
    let buffer = '';
    socket.on("data", data => {
        buffer += data.toString();

        // Check if we received the full HTTP request (ending in \r\n\r\n)
        if (buffer.includes('\r\n\r\n')) {
            const isConnectionClose = buffer.toLowerCase().includes('connection: close');
            const httpResponse = `HTTP/1.1 200 OK\r\n` +
                `Content-Type: text/plain\r\n` +
                `Content-Length: 13\r\n` +
                `\r\n` +
                `Hello World!`;
            socket.write(httpResponse);
            buffer = ''; // reset buffer after handling
            if (isConnectionClose) { // if client passes
                //  ` GET /about HTTP/1.1
                // Host: example.com
                // Connection: close ` 
                // then we should close the connection                
                socket.end();
            }
        }
    });


    socket.on('end', () => {
        console.log('Client disconnected');
    });

})


server.listen(8080)


