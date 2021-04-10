const joi = require('@hapi/joi');
const response = require('../utils').utils.response

module.exports = async (req, res, next) => {
    try {

        const userBody = joi.object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required()
        })

        let result = await userBody.validateAsync(req.body).catch((error) => {
            res['data'] = error;
            res['message'] = "Validation Error";
            res['code'] = 500;
            throw res;
        })

        if (result) {
            next();
        }

    } catch (error) {
        response.response(error)
    }
}