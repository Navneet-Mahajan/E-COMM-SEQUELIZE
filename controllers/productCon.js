const moment = require("moment");
const { updateValidate } = require("../validations/userValidations");
const { Users } = require('../database/dbModels').models;
const { Products } = require("../database/dbModels").models;
const { decrypt } = require('../utils/utility');
const { Sequelize } = require('sequelize');
const { sequelize } = require("../database/connect-db");

async function registerProduct(req, res, next) {
	try {
		const product = await Products.create({
			name: req.body.name,
			price: req.body.price,
			image: req.file.path,
			createdBy: req.user.id
		});
		res.json({
			message: "Product registered Successfully",
			product: product,
		});
	} catch (err) { next(err) }
};

async function listAll(req, res, next) {
	try {
		const products = await Products.findAll({
			attributes: [
				'id', 'name', 'price', 'image', 'createdBy'
			],
		});
		res.json({
			message: "All Products",
			products: products
		})
	} catch (error) {
		next(error);
	}
}

async function viewProductById(req, res, next) {
	try {
		let product = await Products.findOne({
			where: { id: req.params.id },
			attributes: ['id', 'name', 'price', 'image', 'createdBy'],
			include: [{
				model: Users,
				as: "createdBy_User",
				attributes: ['id', [Sequelize.fn('concat', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'fullName'], 'email', 'profileImage']
			}]
		});
		if (!product) {
			throw new Error('Product not found');
		}
		product.createdBy_User.email = decrypt(product.createdBy_User.email);
		res.json({
			message: "result",
			product: product,
		});
	} catch (err) {
		next(err);
	}
}

async function updateProduct(req, res, next) {
	try {
		let product = await Products.findByPk(req.params.id);
		if (!product) {
			throw new Error('Product Not Found');
		}
		if (req.user.id != product.createdBy) {
			throw new Error("Invalid Merchant for this product")
		}
		let newImage = null;
		if (req.file) {
			newImage = req.file.path;
		}
		await Products.update({
			name: req.body.name || product.name,
			price: req.body.price || product.price,
			image: newImage || product.image,
			updatedAt: moment().utc().format()
		}, { where: { id: product.id } });

		res.sendStatus(200);
	} catch (err) {
		next(err)
	}
}

module.exports = { registerProduct, listAll, viewProductById, updateProduct }