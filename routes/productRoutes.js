const router = require('express').Router();
const { authorize } = require('../middlewares/authorize');
const upload = require('../middlewares/multer');
const { validate } = require('express-validation');
const { proRegValidate, viewById, updateProValidate } = require("../validations/productValidations");
const { registerProduct, listAll, viewProductById, updateProduct } = require('../controllers/productCon');

//register product 
router.post('/', authorize(['merchant']), upload.single('image'), validate(proRegValidate), registerProduct);

//list all products
router.get('/', listAll);

//view product by id 
router.get('/:id', validate(viewById), viewProductById);

//update Product 
router.put('/:id', authorize(['merchant']), upload.single('image'), validate(updateProValidate), updateProduct);

module.exports = router;
