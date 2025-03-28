const { Joi } = require('express-validation');

const errorMessages = (field, min = null, max = null) => {
    return {
        "any.required": `${field} is required`,
        "string.empty": `${field} cannot be empty`,
        "string.min": `${field} must contain atleast ${min} characters`,
        "string.max": `${field} cannot exceed ${max} characters`,
        "string.email": "please enter valid email address",
        "string.only": "Entered value must be among the valid values",
        "any.integer": `${field} must be an integer`,
        "any.positive": `${field} must be positive`,
        "any.number" : `${field} must be a number`
    }
}

module.exports = { errorMessages };