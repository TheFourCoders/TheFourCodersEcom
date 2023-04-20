const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { dbConnection } = require('../DB/configDB');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/users/';
        
        this.DB();
        this.middlewares();
        this.routes();
    };

    async DB() {
        await dbConnection();
    };

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    };

    routes() {
        this.app.use(this.userPath, require('../routes/userRoutes'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    };
};

module.exports = Server; 