const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    id: {type: Number, required: true},
    mealId: {type: Number, required: true},
    buyerId: {type: Number, required: true}
});

module.exports = mongoose.model('Order', orderSchema);