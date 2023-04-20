
const { request, response } = require('express'); 
const bcryptjs = require('bcryptjs');
const User = require('../models/UserModel');
const generateToken = require('../helpers/generateToken');

const getAllUsers = async (req = request, res = response) => {
    try {
        User.find({}).then(function (users) {
            res.status(200).json({ status: 'OK', data: users });
        });   

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            data: { error: 'Could not get all users' }
        });    
    };
};

const createUser = async (req = request, res = response) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });

        const salt = bcryptjs.genSaltSync();
        newUser.password = bcryptjs.hashSync(password, salt);

        await newUser.save();
        res.status(200).json({ status: 'OK', data: newUser });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            data: { error: 'Could not create the user' }
        });        
    };
};

const loginUser = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;
        const filterEmail = { email }
        const user = await User.findOne(filterEmail);

        if(!user) {
            return res.status(400).json({ msg: 'The email do not exists in DB' });
        }

        const validPassword = bcryptjs.compareSync( password, user.password );

        if(!validPassword) {
            return res.status(400).json({ msg: 'The email or the password do not exists in DB' });
        }

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        res.status(200).json({ status: 'OK', data: user, token: generateToken(user._id) });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            data: { error: 'Could not complete login' }
        }); 
    }
};

const patchUser = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { password, ...rest } = req.body;
        
        const updateUser = await User.findByIdAndUpdate(id, rest, {
            returnOriginal: false
        });

        res.status(200).json({status: 'OK', data: updateUser});
    
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            data: { error: 'Could not update the data' }
        }); 
    }
};

const deleteUser = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        res.status(200).json({ status: 'User removed', data: user });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            data: { error: 'Could not delete the user' }
        }); 
    }
};

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    patchUser,
    deleteUser
};