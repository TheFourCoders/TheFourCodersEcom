const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { client } = require('../DB/databasepg');

const validateJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({ 
            status: 'FAILED',
            data: {
                error: 'You do not have any token',
            }
        });
    };
 
    try {  
        const user = jwt.verify( token, process.env.JWT_SECRET );
        
        if( !user ) {
            return res.status(401).json({
                msg: 'Token not valid - user do not exists in DB'
            })
        }
            
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(403)
    }
}

module.exports = {
    validateJWT
}