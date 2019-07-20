const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('Account', accountSchema);