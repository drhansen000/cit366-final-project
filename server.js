const http = require('http');

// Create an instance of an express application
const app = require('./backend/routing/app');

/// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {console.log("Listening on localhost: " + port)});

