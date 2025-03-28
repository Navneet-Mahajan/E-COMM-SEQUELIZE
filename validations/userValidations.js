const { Joi } = require('express-validation');
const { errorMessages } = require('../utils/validationErrors');
const bodyParser = require('body-parser');

const registerValidate = {
    body: Joi.object({
        firstName: Joi.string().trim().required().messages(errorMessages('firstName')),
        lastName: Joi.string().trim().required().messages(errorMessages('lastName')),
        email: Joi.string().trim().email().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/).required().messages(errorMessages('email')),
        password: Joi.string().trim().min(8).max(15).required().messages(errorMessages('password', 8, 15)),
        role: Joi.string().valid("user", "merchant").required().messages(errorMessages('role'))
    })
};

const loginValidate = {
    body: Joi.object({
        email: Joi.string().trim().email().required().messages(errorMessages('email')),
        password: Joi.string().trim().min(8).max(15).required().messages(errorMessages('password', 8, 15))
    })
}

const updateValidate = {
    body: Joi.object({
        firstName: Joi.string().trim().optional().messages(errorMessages('firstName')),
        lastName: Joi.string().trim().optional().messages(errorMessages('lastName')),
        password: Joi.string().trim().min(8).max(15).optional().messages(errorMessages('password', 8, 15)),
    })
}

const forgetPassValidate = {
    body: Joi.object({
        email: Joi.string().trim().email().messages(errorMessages('email'))
    })
}

const resetPassValidate = {
    body: Joi.object({
        email: Joi.string().trim().email().messages(errorMessages('email')),
        OTP: Joi.string().trim().length(4).message(errorMessages('OTP')),
        newPassword: Joi.string().trim().required().min(8).max(15).messages(errorMessages('password'))
    })
}

module.exports = { registerValidate, loginValidate, updateValidate, forgetPassValidate, resetPassValidate };