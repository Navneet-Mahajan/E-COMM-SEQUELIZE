const { Joi } = require('express-validation');
const { errorMessages } = require('../utils/validationErrors');
const { param } = require('../routes/productRoutes');
const bodyParser = require('body-parser');

const proRegValidate = {
	body: Joi.object({
		name: Joi.string().trim().required().messages(errorMessages('email')),
		price: Joi.number().positive().required().messages(errorMessages('price'))
	})
}

const viewById = {
	params: Joi.object({
		id: Joi.number().positive().required().messages(errorMessages('id'))
	})
}

const updateProValidate = {
	params: Joi.object({
		id: Joi.number().positive().required().messages(errorMessages('id'))
	}),
	body: Joi.object({
		name: Joi.string().trim().messages(errorMessages('email')),
		price: Joi.number().positive().messages(errorMessages('price'))
	})
}

module.exports = { proRegValidate, viewById, updateProValidate }