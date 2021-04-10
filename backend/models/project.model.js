const mongoose = require('mongoose');
const hashPassword = require('password-hash');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    comments: [
        {
            body: String,
            date: { type: Date, default: Date.now },
            userId: {
                type: ObjectId,
                ref: 'User'
            },
        }
    ],
    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
});

module.exports = mongoose.model('Project', projectSchema);


