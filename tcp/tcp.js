const net = require('net');

const server = net.createServer(socket => {
    socket.write("hello world from tcp");
    socket.on("data", data => {
        console.log(data.toString())
    })

})


server.listen(8080)

// after starting server 

// to set up connection 

// telnet 127.0.0.1 8080(port on which server is running)




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
