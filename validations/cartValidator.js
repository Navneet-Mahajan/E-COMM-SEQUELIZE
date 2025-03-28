const { Joi } = require('express-validation');
const { errorMessages } = require("../utils/validationErrors");

const cartValidator = {
    body: Joi.object({
        productId: Joi.number().positive().integer().messages(errorMessages('id')),
        quantity: Joi.number().positive().integer().messages(errorMessages('quantity'))
    })
}

module.exports = { cartValidator }