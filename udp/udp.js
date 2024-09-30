const dgram = require('dgram');
const socket = dgram.createSocket('udp4');  // based on Ip addess Ipv4


// whenever receive a message call this callback function
socket.on('message', (msg, rinfo) => {
    console.log('yes called')
    console.log(`server got: ${msg} from ${rinfo.address}: ${rinfo.port}`)
})


socket.bind(8081);

// syntax to send data in udp 

// echo 'message' | nc (netcat) -w1 (optional , it establish a timeout, 1 is 1 sec ) -u 127.0.0.1 (server in this cased local machine) 8081 (port)
 







// UDP -> User datagram protocol

// Pros 

// Smaller packets - since it doesn't add any header for acknowledment or anthing , so packets are smaller as compare to TCP.

// Less bandwith -> since packets are smaller ,it consumes lesser bandwidth.

// Faster than tcp -> to wait for congestion control or packets ordering

// stateless



// Cons

// No acknowledgment

// No Guaranteed delivery

// Connectionless

// NO Congestion control 

// No Ordered packets

// Security

