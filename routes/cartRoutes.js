const router = require('express').Router();
const { validate } = require("express-validation");
const { authorize } = require('../middlewares/authorize');
const { addtoCart, viewCart } = require('../controllers/cartCon');
const { cartValidator } = require('../validations/cartValidator')

//add to cart
router.post('/', validate(cartValidator), authorize(), addtoCart);

//view Cart
router.get('/', authorize(), viewCart);

module.exports = router;