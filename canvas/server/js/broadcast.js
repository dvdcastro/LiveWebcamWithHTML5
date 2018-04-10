var sys = require('util'), 
    ws = require('ws').Server;
    
var server = new ws({port: 8080});

clients = [];

server.on("connection", function(websocket) {
    clients.push(websocket);
    
    console.log(clients.length);
    
    websocket.on('message', function(data) {
        for (var i = 1; i < clients.length; i++) {
           clients[i].send(data);
        }
    });

    // websocket.on('message', function(data) {
    //     for (var i = 1; i < clients.length; i++) {
    //        clients[i].send(data);
    //     }
    // });
    
    websocket.on('close', function() {
        console.log('close');
        
        for (var i = 0; i < clients.length; i++) {
            if (clients[i] == websocket) {
                clients.splice(i);
                break;
            }
        }
    });
});

console.log('Listening on port 8080');
