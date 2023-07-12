
const { request, response } = require('express');
const { client } = require('../DB/databasepg');
const { ConnectionError } = require('../ERR/Errors');

const addToCart = async(req = request, res = response) => {
    try {
        const { user_id } = req.params;     
        const { product_id } = req.params;     
        const query = 'INSERT INTO cart (user_id, product_id) VALUES ($1, $2)';
        await client.query(query, [user_id, product_id]);

        res.status(200).json({ msg: 'Success' });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
};

const getCartData = async (req = request, res = response) => {
    try {
        const { userId } = req.params; 
        const query = `SELECT products.* FROM cart
                       JOIN products ON cart.product_id = products.productid
                       WHERE cart.user_id = $1`;

        const { rows } = await client.query(query, [userId]);  
        res.status(200).json({ data: rows });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
         });
    }
};

const payAmount = async (req = request, res = response) => {
    try {
        const { userId } = req.params;
        
        const query = `SELECT SUM(products.price) FROM cart
                 JOIN products ON cart.product_id = products.productid
                 WHERE cart.user_id = $1`;
       
        const { rows } = await client.query(query, [userId]);

        res.status(200).json({ status: 'OK', total: rows[0].sum })

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
}

const removeProductFromCart = async (req = request, res = response) => {
    try {
        const { userId } = req.params;
        const { productId } = req.params;

        const query = 'DELETE FROM cart WHERE user_id = $1 AND product_id = $2';
        await client.query(query, [userId, productId]);

        res.status(200).json({ msg: 'Product removed' });
    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
}

module.exports = {
    addToCart,
    getCartData,
    payAmount,
    removeProductFromCart
}