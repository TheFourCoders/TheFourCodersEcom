const User = require('../models/UserModel');

const verifyEmail = async (email = '') => {
    const checkEmail = await User.findOne({ email });

    if(checkEmail) {
        throw new Error(`The email: ${ email } is already in use`)
    }
};


const verifyId = async (id = '') => {
    const checkId = await User.findById(id);
    
    if(!checkId) {
        throw new Error(`The id: ${ id } do not exists in DB`) 
    } 
};


module.exports = {
    verifyEmail,
    verifyId
};