const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/users/';
        this.cartPath = '/cart/';
        this.paymentPath = '/payment/';
        this.productPath = '/products/';

        this.middlewares();
        this.routes();
    };

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    };

    routes() {
        this.app.use(this.userPath, require('../routes/userRoutes'));
        this.app.use(this.paymentPath, require('../routes/paymentRoutes'));
        this.app.use(this.productPath, require('../routes/productsRoutes'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    };
};

module.exports = Server; 