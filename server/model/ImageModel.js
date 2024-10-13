// backend/models/ImageModel.js

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        default: '/uploads/default.png',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Image = mongoose.model('Imageupload', imageSchema);

module.exports = Image;
