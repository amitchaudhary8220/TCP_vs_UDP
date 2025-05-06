const net = require('net');

const server = net.createServer(socket => { //net.createServer: Creates a TCP server.
    socket.write("hello world from tcp");  //socket.write: Sends data to client.

    // socket.on("data", data => { //socket.on("data"): Receives data from client.
    //     const request = data.toString();
    //     console.log(request);
    //     const keepAlive = request.includes('Connection: keep-alive');
    //     console.log(keepAlive);
    //     console.log(data.toString());


    //     // Prepare a raw HTTP response
    //     const httpResponse = `HTTP/1.1 200 OK
    // Content-Type: text/plain
    // Content-Length: 13

    // Hello World!`;

    //     socket.write(httpResponse); // Send response
    //     // socket.end();

    //     //If we want to make connection alive after sending the response, we can only close it, when it don't get flag like 'Connection: keep-alive'
    //     // if (!keepAlive) {
    //     //     socket.end();
    //     // }
    // })


    let buffer = '';
    socket.on("data", data => {
        buffer += data.toString();

        // Check if we received the full HTTP request (ending in \r\n\r\n)
        if (buffer.includes('\r\n\r\n')) {
            console.log('Full request received:\n', buffer);

            const keepAlive = buffer.includes('Connection: keep-alive');
            console.log('keepAlive:', keepAlive);

            const httpResponse = `HTTP/1.1 200 OK\r\n` +
                `Content-Type: text/plain\r\n` +
                `Content-Length: 13\r\n` +
                (keepAlive ? `Connection: keep-alive\r\n` : ``) +
                `\r\n` +
                `Hello World!`;

            socket.write(httpResponse);
            if (!keepAlive) socket.end();

            buffer = ''; // reset buffer after handling
        }
    });


    socket.on('end', () => {
        console.log('Client disconnected');
    });

})


server.listen(8080)

// after starting server  

// to set up connection 

// telnet 127.0.0.1 8080(port on which server is running) 

// above command 'telnet 127.0.0.1 8080' is used to make connection from client to the server after making connection we can also send data to client
// after connection just send the data


// TCP => transfer control protocol 

// Pros 

// Acknowledgment
// Guaranteed delivery
// Connection based
// Congestion control 
// Ordered packets

// Cons

// Larger packets 
// More bandwidth
// slower than udp 
// stateful 
// Server memory (DOS)




// when I was sending request from client i was send this 
   
// GET / HTTP/1.1
// Host: localhost
// Connection: keep-alive

// but on server i was not getting whole header at once 

// Why you're not getting the full request at once:
// Because TCP is a streaming protocol, data can arrive in chunks — there is no guarantee that all HTTP headers will arrive in a single .on("data") event.

// Your client sent the entire HTTP request, but the kernel/network stack may split it — e.g.:

// first I received -> GET / HTTP/1.1\r\nHost: example.com\r\n

// then GET / HTTP/1.1\r\nHost: example.com\r\n



// 🔁 TCP Streams Can Split or Combine Packets Arbitrarily
// This is normal and expected in TCP. It doesn't care about “messages” — only bytes. You must handle partial messages yourself.

// ✅ Fix: Buffer the data until the full HTTP headers are received
// You should collect incoming data chunks until you hit the HTTP header terminator: \r\n\r\n.

// ✅ Why \r\n\r\n is a Reliable Signal in HTTP
// In HTTP/1.x, the headers section always ends with a blank line:

// This is a well-defined rule in the HTTP protocol:
  // \r\n = line break
  // So \r\n\r\n = an empty line, marking end of headers

// Important:
// This only indicates the end of the headers, not the whole HTTP request. So...

// ✅ To know when entire data is received:
// 1. For HTTP GET requests:
// There's usually no body, just headers.

// So once you receive \r\n\r\n, you're done. Safe to parse and respond.

// 2. For POST/PUT requests with body:
// You must read the Content-Length header.

// It tells you how many bytes to read after the \r\n\r\n.