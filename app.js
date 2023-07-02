require('dotenv').config();

const Server = require('../backend/models/Server');

const server = new Server();

server.listen();