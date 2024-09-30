# TCP_vs_UDP

// TCP

Since TCP is stateful protocol, so we need to set up the connection before sending any message. Once we set uped the connection, we can sent the message until server is running.
Once server is closed , we can't send the message.
When server will be restarted we again have to make connection bofore sending the request.

// how to make connection 

telnet 127.0.0.1 (Ip address of local machine) 8080 (port on which server is running)


// UDP

since UDP is stateless protocol, so we don't need to set up the connection before sending the message ,on sever need to be running, onces sever is closed and again when it is running we are directly start sending message 

// how to send message on udp

echo 'message' nc(netcat) -w1 (delay) -u 127.0.0.1(IP) 8081 (port of server)