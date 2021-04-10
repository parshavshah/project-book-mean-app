const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    path: new Schema({
        entitiy: String,
        valueId: {
            type: ObjectId
        },
    }),
    date: { type: Date, default: Date.now },
    read: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Notification', notificationSchema);


