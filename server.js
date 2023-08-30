'use strict';

const tls = require('tls');
const fs = require('fs');
const port = 8000;

const options = {
    key: fs.readFileSync('certs/root-private-key.pem'),
    cert: fs.readFileSync('certs/root-certificate.pem'),
    ca: fs.readFileSync('certs/ca-root-certificate.pem'), // authority chain for the clients
    requestCert: true, // ask for a client cert
    rejectUnauthorized: false, // act on unauthorized clients at the app level
};


var server = tls.createServer(options, (socket) => {
  console.log("CLIENT IP:", socket.remoteAddress)
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
})

.on('connection', function(c)
{
    console.log('insecure connection')
})

.on('secureConnection', function (c)
{
    
    // c.authorized will be true if the client cert presented validates with our CA
    console.log('secure connection; client authorized: ', c.getPeerCertificate());
})

.listen(port, function() {
    console.log('server listening on port ' + port + '\n');
});
