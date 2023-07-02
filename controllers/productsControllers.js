const { request, response } = require('express'); 
const generateToken = require('../helpers/generateToken');
const { client } = require('../DB/databasepg');
const { query } = require('express-validator');

const getAllProducts = async (req = request , res = response) => {
    try {
        const products = await client.query('SELECT * FROM products');

        res.status(200).json({status: 'ok' , data: products.rows});
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            data: {error:'Could not get all products'}
        })
    }
};

const createProducts = async(req = request , res = response) =>{
    try {
       const {name,price,description,img} = req.body;
       
       const products = await client.query('INSERT INTO products (name,price,description,img) VALUES ($1 , $2 , $3, $4)',
         [name,price,description,img]
       );

       res.status(201).json({
          status: 'ok',
          data: products.rows,
          msg: 'product added successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:'FAILED',
            data:{error:'Could not create the product'}
        })
    }
};

const updateProducts = async (req = request , res = response) =>{
    try {
        const {id} = req.params;
        const {name,price,description,img} = req.body;
        const query = 'UPDATE products SET name = $1, price = $2 description = $3 img = $4 WHERE productid = $5 '
        
        const updateproduct = await client.query(query,[name,price,description,img,id]);

        res.status(200).json({
            status: 'OK',
            data: updateproduct.rows,
            msg: 'update product'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            data: {error: 'could not update the product'}
        })
    }
};

const deleteProducts = async (req = request , res = response) =>{
   try {
    const {id} = req.params;
    const query = 'DELETE FROM products where productid = $1';

    await client.query(query,[id])
    res.status(200).json({
        status: 'OK',
        msg: 'product delete'
    });

   } catch (error) {
    console.log(error)
    res.status(400).json({
        status: 'FAILED',
        data: {error: 'could not delete the product'}
    });
   }
};

module.exports = {
    getAllProducts,
    createProducts,
    updateProducts,
    deleteProducts
};
