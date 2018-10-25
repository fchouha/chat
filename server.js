var server = require('http').createServer();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });
var clients = [];

wss.on('connection', function(ws) {
    console.log('New connection...');
    ws.on('message', function(msg) {
        console.log(msg);
        msg = JSON.parse(msg);
        if (msg.type == 'subscribe') {
            clients.push({
                sessionId: msg.sessionId,
                socket: ws
            });
            ws.send(JSON.stringify({
                type: 'subscribe',
                status: 'OK'
            }));
        }
        else if (msg.type == 'message') {
            clients[msg.to].socket.send(JSON.stringify(msg));
        }
    });
});

server.listen(3020, function() {
    console.log('Listening on ' + server.address().port);
});
