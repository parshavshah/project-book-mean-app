const mongoose = require('mongoose');
const hashPassword = require('password-hash');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: (val) => {
            return hashPassword.generate(val)
        }
    },
    role: {
        type: String,
        required: true,
        default:'user'
    },
    status: {
        type: Number,
        required: false,
        default: 0
    },
    verificationCode: {
        type: String,
        required: false,
        default: () => {
            return Math.floor(1000 + Math.random() * 9000);
        }
    }
});

module.exports = mongoose.model('User', userSchema);