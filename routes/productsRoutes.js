const express = require('express');
const router = express.Router();

const {check} = require('express-validator');
const validateFields = require('../middlewares/validateFields');
const {verifyEmail,verifyId} = require('../helpers/db-validation');

const {validateJWT} = require('../middlewares/validateJWT');
const productControllers = require('../controllers/productsControllers');


router.get('/',productControllers.getAllProducts);

router.post('/' , [
    check('name','the name is required').notEmpty(),
    check('price','enter an valid price').isNumeric(),
    check('description','enter a product description').notEmpty(),
    check('img' , 'enter a picture').notEmpty(),
    validateFields,
],productControllers.createProducts);

router.patch('/:id',[
    check('id').custom(verifyId),
    validateFields,
],productControllers.updateProducts);

router.delete('/:id',[
    check('id').custom(verifyId),
    validateFields,
],productControllers.deleteProducts);

module.exports = router

