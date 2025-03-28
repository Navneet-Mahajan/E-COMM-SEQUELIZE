const router = require('express').Router();

const user = require('./userRoutes.js')
const product = require('./productRoutes.js')
const cart = require('./cartRoutes.js');

router.use('/api/users', user);
router.use('/api/products', product);
router.use('/api/cart', cart)

module.exports = router 