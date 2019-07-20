const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    rating: {type: Number, required: false},
    description: {type: String, required: false},
    ingredients: [{type: String}],
    imageUrl: {type: String, default:'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'},
    cookId: {type: Number, required: true}
});

module.exports = mongoose.model('Meal', mealSchema);