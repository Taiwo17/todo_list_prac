const mongoose = require('mongoose');

// List of Students Schema

const listSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    body: {type: String, required: true},
    dueDate: Date
});

module.exports = mongoose.model('List', listSchema)

// Note: Make use of the models in the routing folders 