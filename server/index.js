const Hapi = require('hapi');
const routes = require('./routes')
const mongoose = require('mongoose');

const server = new Hapi.Server();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:currency')
mongoose.connection
    .once('open',() => console.log('ok'))
// Transaction.collection.drop();

server.connection({
    host: 'localhost',
    port: 8000,
    routes: {cors: true},
});

server.route(routes)

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});