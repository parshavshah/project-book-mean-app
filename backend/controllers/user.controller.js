const hashPassword = require('password-hash');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
require('dotenv').config()

const utils = require('../utils').utils
const response = utils.response;
const mail = utils.mail;

const userModel = require('../models').models.userModel;

/**
 * @name : loginUser
 * @description : to login the user 
 */
exports.loginUser = async (req, res, next) => {
    try {

        let body = req.body;
        console.log(req.body)

        // find the user
        let dbResponse = await userModel.findOne({
            email: body.username
        }).exec().then((response) => {
            return JSON.parse(JSON.stringify(response))
        })

        // check user is exist or not
        if (!dbResponse) {
            throw new Error("User not found");
        }

        // check password is right or not ?
        if (hashPassword.verify(body.password, dbResponse['password'])) {

            // check user is verified or not 
            if (dbResponse['status'] == 0) {
                throw new Error("Your account is not verified yet");
            }

            dbResponse = _.omit(dbResponse, ['password', '__v', 'verificationCode', 'status']);
            dbResponse['name'] = dbResponse['firstName'] + ' ' + dbResponse['lastName'];

            // generate JWT token for authorization
            dbResponse = jwt.sign({
                data: dbResponse
            }, process.env.tokenSecret, {
                expiresIn: '10h'
            });

            res['data'] = dbResponse;
            res['message'] = "Login success";
            response.response(res);

        } else {
            throw new Error("Password is incorrect");
        }

    } catch (error) {
        res.message = error.message;
        res.code = 500;
        res.data = error;
        response.response(res);
    }
}

/**
 * @name : registerUser
 * @description : to register the user 
 */
exports.registerUser = async (req, res) => {
    try {

        let body = req.body;

        // check that user already exist ?
        let dbCountResponse = await userModel.count({
            email: body['email']
        })

        if (dbCountResponse > 0) {
            throw new Error("User already exist");
        }

        // create user process
        let dbResponse = await userModel.create(body).then((resultData) => {
            resultData = JSON.parse(JSON.stringify(resultData))
            resultData = _.omit(resultData, ['password', 'role', '__v', '_id', 'status']);
            return resultData;
        })

        if (dbResponse) {

            // user created - send the success mail
            // await mail.sendMail({
            //     to: body.email,
            //     subject: `Welcome ${dbResponse['firstName'] + ' ' + dbResponse['lastName']} to our TestWebsite.com`,
            //     text: `Your Verification Code is ${dbResponse['verificationCode']}, Please verify.`
            // })

            delete dbResponse['verificationCode']
            res['data'] = dbResponse;
            res['message'] = "User created";

        } else {
            res['message'] = "Something went wrong, Please try again";
        }

        // Send the response
        response.response(res);

    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        res['code'] = 500;
        response.response(res);
    }
}

/**
 * @name : verifyUser
 * @description : to verify the user from the app 
 */
exports.verifyUser = async (req, res) => {
    try {

        let code = req.body.code;
        let email = req.body.email;

        let dbResponse = await userModel.findOne({
            email: email
        }, {
            _id: 0,
            password: 0,
            __v: 0
        })

        if (dbResponse) {

            // check account is already verified or not
            if (dbResponse['status'] == 1) {
                throw new Error("Your account is already verified");
            }

            if (dbResponse['verificationCode'] == code) {

                // Update the account status
                await userModel.updateOne({
                    email: email
                }, {
                    status: 1,
                    verificationCode: undefined
                })

                res['data'] = dbResponse;
                res['message'] = "Your account is verified";
                response.response(res);

            } else {
                throw new Error("Code is incorrect, Please check")
            }
        } else {
            throw new Error("User not found")
        }

    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        res['code'] = 500;
        response.response(res);
    }
}



/**
 * @name : getUserProfile
 * @description : to get user profile
 */
exports.getUserProfile = async (req, res) => {
    try {

        let userId = req.params.id;

        let dbResponse = await userModel.findOne({
            _id: userId
        }, {
            password: 0,
            __v: 0,
            verificationCode: 0,
            role: 0,
            status: 0
        })

        if (dbResponse) {

            res['data'] = dbResponse;
            res['message'] = "User profile";
            res['code'] = 200

            response.response(res)

        } else {
            throw new Error("User not found")
        }

    } catch (error) {
        res['message'] = error.message;
        res['data'] = error;
        res['code'] = 500;
        response.response(res);
    }
}
