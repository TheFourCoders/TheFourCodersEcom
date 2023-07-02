
const { client } = require('../DB/databasepg');

const verifyEmail = async (email = '') => {
    const query = `SELECT email FROM "users" WHERE "email" = $1`;        
    
    const checkEmail  = await client.query(query, [email]);
    
    if(checkEmail) {
        throw new Error(`The email: ${ email } is already in use`)
    }
};


const verifyId = async (id = '') => {
    const query = 'Select id FROM users WHERE id = $1';

    const checkId = await client.query(query, [id]);

    if(!checkId) {
        throw new Error(`The id: ${ id } do not exists in DB`) 
    } 
};


module.exports = {
    verifyEmail,
    verifyId
};