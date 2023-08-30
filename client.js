'use strict';

const port = 3031;
const hostname = '13.229.217.138';

const tls = require('tls');
var fs = require('fs');

const options = {
  host: hostname,
  port: port,

  // Necessary only if using the client certificate authentication
  key: fs.readFileSync('certs/user1-private-key.pem'),
  cert: fs.readFileSync('certs/user1-certificate.pem'),

  // Necessary only if the server uses the self-signed certificate
  ca: fs.readFileSync('certs/ca-root-certificate.pem')
};

var socket = tls.connect(options, () => {
  console.log('client connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(socket);
  process.stdin.resume();

  socket.end();
})

.setEncoding('utf8')

.on('data', (data) => {
  console.log(data);
})

.on('end', () => {
  console.log("End connection");
});
