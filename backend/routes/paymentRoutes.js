
const express = require('express');
const router = express.Router();

const paymentControllers = require('../controllers/paymentControllers');

router.post('/create-order', paymentControllers.createOrder);

router.get('/capture-order', paymentControllers.captureOrder);

router.get('/cancel-order', paymentControllers.cancelOrder);

module.exports = router;