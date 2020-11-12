const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
                 .alphanum()
                 .min(4)
                 .max(10)
                 .required(),
    email: Joi.string()
              .email({ tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
                 .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$')),
});

function registerValidator(payload, next) {
    const {value, error} = schema.validate(payload);
    if (error) {
        error.status = 400;
        throw error;
    }
    return true;
}

module.exports = {
    registerValidator,
}
