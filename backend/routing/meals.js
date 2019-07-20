const express = require('express');
const Meal = require('../models/meal');

// Use express.Router() to return a smaller version of an Express app
const router = express.Router();

// Get all of the meals
function getMeals(res) {
    Meal.find()
    .then(meals => {
        getMaxMealId(meals);
        res.status(200).json(meals);
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
}

// Get all of the meals (to generate the meal list)
router.get('/', (req, res) => {
    getMeals(res);
});

// Get a single meal (to generate the meal detail)
router.get('/:id', (req, res) => {
    Meal.findOne({id: req.params.id})
    .then(meal => {
        res.status(200).json(meal);
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
});

module.exports = router;