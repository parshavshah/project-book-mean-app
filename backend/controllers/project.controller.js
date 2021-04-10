const hashPassword = require('password-hash');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const utils = require('../utils').utils
const response = utils.response;

const projectModel = require('../models').models.projectModel;
const notificationModel = require('../models').models.notificationModel;


exports.createProject = async (req, res) => {
    try {

        let body = req.body;

        // check that user already exist ?
        let dbCountResponse = await projectModel.count({
            title: body['title']
        }).catch((error) => {
            throw error;
        });

        if (dbCountResponse > 0) {
            throw new Error("Project already exist");
        }

        body.author = ObjectId(req.user._id)

        let dbResponse = await projectModel.create(body).then((resultData) => {
            resultData = JSON.parse(JSON.stringify(resultData))
            return resultData;
        })

        res['data'] = dbResponse;
        res['message'] = "Project created";
        res['code'] = 200

        response.response(res);

    } catch (error) {
        res.message = error.message;
        res.code = 500;
        res.data = error;
        response.response(res);
    }
}

exports.getAllProjects = async (req, res) => {
    try {

        const dbResponse = await projectModel
            .find({ hidden: false })
            .select('-hidden -__v')
            .sort({ date: 1 })
            .populate('author', 'firstName lastName')
            .populate('comments.userId', 'firstName lastName')
            .exec().then((response) => {
                return JSON.parse(JSON.stringify(response))
            })

        res['data'] = dbResponse;
        res['message'] = "Project created";
        res['code'] = 200

        response.response(res);
    } catch (error) {
        res.message = error.message;
        res.code = 500;
        res.data = error;
        response.response(res);
    }
}

exports.getMyProject = async (req, res) => {
    try {

        const dbResponse = await projectModel.find({
            hidden: false,
            author: ObjectId(req.user._id)
        }).select('title date').sort({ date: -1 }).exec().then((response) => {
            return JSON.parse(JSON.stringify(response))
        })

        res['data'] = dbResponse;
        res['message'] = "Project created";
        res['code'] = 200

        response.response(res);

    } catch (error) {
        res.message = error.message;
        res.code = 500;
        res.data = error;
        response.response(res);
    }
}

exports.updateProject = async (req, res) => {
    try {

        let body = req.body;
        let _id = req.body._id;
        const userId = req.user._id

        let dbCountResponse = await projectModel.count({
            _id: _id,
            author: userId
        })

        if (dbCountResponse <= 0) {
            throw new Error("You cannot update project");
        }

        let dbResponse = await projectModel.updateOne({
            _id: ObjectId(_id),
        }, body).catch((error) => {
            throw error;
        });

        res['data'] = dbResponse;
        res['message'] = "Project updated successfully";

        response.response(res);
    } catch (error) {
        res.message = error.message;
        res.code = 500;
        res.data = error;
        response.response(res);
    }
}

exports.createComment = async (req, res) => {
    try {

        let body = req.body;

        const comment = {
            userId: ObjectId(req.user._id),
            body: body.comment
        }

        let dbResponse = await projectModel.updateOne({
            _id: ObjectId(body.projectId)
        }, {
            $push: {
                'comments': comment
            }
        }).catch((error) => {
            throw error;
        });

        const notificationBody = {
            title: 'New comment in your project',
            path: {
                entitiy: 'project',
                valueId: ObjectId(dbResponse._id)
            }
        }

        await notificationModel.create(notificationBody).then((resultData) => {
            resultData = JSON.parse(JSON.stringify(resultData))
            return resultData;
        })
        res['data'] = dbResponse;
        res['message'] = "Comment added successfully";

        response.response(res);
    } catch (error) {
        res.message = error.message;
        res.code = 500;
        res.data = error;
        response.response(res);
    }
}

exports.updateComment = async (req, res) => {
    try {

        let dbResponse = await projectModel.updateOne(
            {
                _id: ObjectId(req.body.projectId),
                comments: { $elemMatch: { _id: ObjectId(req.body.commentId) } }
            },
            {
                $set: {
                    'comments.$.body': req.body.comment,
                    'comments.$.userId': ObjectId(req.user._id)
                }
            }
        )

        res['data'] = dbResponse;
        res['message'] = "Comment added successfully";

        response.response(res);
    } catch (error) {
        res.message = error.message;
        res.code = 500;
        res.data = error;
        response.response(res);
    }
}

exports.addLike = async (req, res) => {
    try {

        let dbResponse = await projectModel.updateOne({
            _id: ObjectId(req.body.projectId)
        }, {
            $addToSet: {
                'likes': ObjectId(req.user._id)
            }
        }).catch((error) => {
            throw error;
        });

        res['data'] = undefined;

        if (dbResponse.nModified == 1) {
            res['message'] = "Like added successfully";
        } else {
            res['message'] = "Like already exists";
        }

        response.response(res);
    } catch (error) {
        res.message = error.message;
        res.code = 500;
        res.data = error;
        response.response(res);
    }
}


exports.removeLike = async (req, res) => {
    try {

        let dbResponse = await projectModel.updateOne({
            _id: ObjectId(req.body.projectId)
        }, {
            $pull: {
                'likes': ObjectId(req.user._id)
            }
        }).catch((error) => {
            throw error;
        });

        res['data'] = undefined;
        if (dbResponse.nModified == 1) {
            res['message'] = "Like removed successfully";
        } else {
            res['message'] = "Like not exists";
        }

        response.response(res);
    } catch (error) {
        res.message = error.message;
        res.code = 500;
        res.data = error;
        response.response(res);
    }
}