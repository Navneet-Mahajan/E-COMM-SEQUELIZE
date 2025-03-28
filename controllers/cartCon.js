const { purge } = require('../routes/cartRoutes');

const { Cart, Products } = require('../database/dbModels').models;

async function addtoCart(req, res, next) {
    try {
        await Cart.create({
            userId: req.user.id,
            productId: req.body.productId,
            quantity: req.body.quantity
        })
        res.json({ message: "Product Added", "Product_id": req.body.productId })
    } catch (error) {
        next(error);
    }
}

async function viewCart(req, res, next) {
    try {
        const userCart = await Cart.findAll({
            where: { userId: req.user.id },
            attributes: ['productId', 'quantity'],
            include: [{
                model: Products,
                as: 'product',
                attributes: ['name', 'price', 'image']
            }]
        },
        )
        res.send(userCart)
    } catch (error) {
        next(error)
    }
}

module.exports = { addtoCart, viewCart }