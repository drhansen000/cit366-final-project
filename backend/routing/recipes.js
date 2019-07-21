const express = require('express');
const Meal = require('../models/meal');

// Use express.Router() to return a smaller version of an Express app
const router = express.Router();

// Get the last meal's position and increment it by one
function getMaxMealId() {
  var maxMealId = 0;
  const meals = getMeals();
  if (!meals) {
    return maxMealId;
  }

  for (let i = 0; i < meals.length; i++) {
    if (meals[i].id > maxMealId) {
      maxMealId = meals[i].id;
    }
  }
  return ++maxMealId;
}

// Get all of the meals (solely to find the max meal id)
function getMeals() {
  Meal.find()
    .then(meals => {
      return meals;
    })
    .catch(error => {
      console.log(error);
      return;
    });
}

// Get all of the meals associated with that cook
function getRecipes(cookId, res) {
  Meal.find({
      cookId: cookId
    })
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
}

// Get all of the meals associated with the active account (to generate the recipe list)
router.get('/:cookId', (req, res) => {
  getRecipes(req.params.cookId, res);
});

// Get a single recipe (to generate the recipe detail)
// router.get('/:mealId', (req, res) => {
//     Meal.findOne({id: req.params.mealId})
//     .then(recipe => {
//         res.status(200).json(recipe);
//     })
//     .catch(error => {
//         res.status(500).json({
//             error: error
//         });
//     });
// });


// Add a recipe
router.post('/', (req, res) => {
    // First, get the maxMealId
    var maxMealId = -1;
    Meal.find()
    .then(meals => {
        for (let meal of meals) {
            if (meal.id > maxMealId) {
            maxMealId = meal.id;
            }
        }
        maxMealId++;
        // Once the maxMealId is found, create a new Meal
        const meal = new Meal({
            id: maxMealId,
            name: req.body.name,
            rating: req.body.rating,
            description: req.body.description,
            ingredients: req.body.ingredients,
            imageUrl: req.body.imageUrl,
            cookId: req.body.cookId
        });
        // Store the new Meal in the database
        meal.save()
        .then(() => {
            getRecipes(req.body.cookId, res);
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
    })
    .catch(error => {
    console.log('ERROR: Unable to find meals');
    console.log(error);
    });
});

// Change a recipe
router.patch('/:id', (req, res) => {
  Meal.findOne({
    id: req.params.id
  }, (error, meal) => {
    if (error || meal === null || meal === undefined) {
      return res.status(500).json({
        message: 'ERROR: Recipe ' + req.params.id + ' not found!'
      });
    }

    meal.id = req.params.id;
    meal.name = req.body.name;
    meal.rating = req.body.rating;
    meal.description = req.body.description;
    meal.ingredients = req.body.ingredients;
    meal.imageUrl = req.body.imageUrl;
    meal.cookId = req.body.cookId;

    meal.save()
      .then(() => {
        // res.status(200).json({message: 'Updated meal ' + req.params.id});
        getRecipes(req.body.cookId, res);
      })
      .catch(error => {
        res.status(500).json({
          error: 'Failed to update meal ' + req.params.id
        });
      });
  });
});

// Delete a meal
router.delete('/:id', (req, res) => {
  Meal.findOne({
    id: req.params.id
  }, (error, meal) => {
    if (error || !meal) {
      res.status(500).json({
        error: 'Unable to find meal ' + req.params.id
      });
    }

    Meal.deleteOne({
        id: req.params.id
      })
      .then(() => {
        getRecipes(meal.cookId, res);
        // res.status(200).json({message: 'Deleted meal ' + req.params.id});
      })
      .catch(error => {
        res.status(500).json({
          error: 'Unable to delete meal ' + req.params.id
        });
      });
  });
});

module.exports = router;
