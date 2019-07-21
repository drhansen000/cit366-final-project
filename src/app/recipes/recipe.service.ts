import { Injectable, EventEmitter } from '@angular/core';
import { Meal } from '../meals/meal.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Meal[] = [];
  recipeSelectedEvent = new EventEmitter<Meal>();
  recipesListChanged = new Subject<Meal[]>();

  constructor(private http: HttpClient) { }

  getRecipes(cookId) {
    this.http.get<Meal[]>('http://localhost:3000/recipes/' + cookId)
    .subscribe((recipes: Meal[]) => {
      this.recipes = recipes;
      this.recipesListChanged.next(this.recipes.slice());
    });
  }

  getRecipe(mealId): Meal {
    for (const recipe of this.recipes) {
      if (recipe.id === mealId) {
        return recipe;
      }
    }
    return null;
  }

  addRecipe(newRecipe: Meal) {
    if (!newRecipe) {
      console.log('No recipe passed!');
      return;
    }
    this.http.post<Meal[]>('http://localhost:3000/recipes', newRecipe)
    .subscribe((recipes: Meal[]) => {
      this.recipes = recipes;
      this.recipesListChanged.next(this.recipes.slice());
    },
    error => {
      console.log('ERROR: Faild to add recipe.');
      console.log(error);
    });
  }

  updateRecipe(originalRecipe: Meal, newRecipe: Meal) {
    if (!originalRecipe || !newRecipe) {
      console.log('Missing a recipe!');
      return;
    }

    newRecipe.id = originalRecipe.id;
    this.http.patch('http://localhost:3000/recipes/' + originalRecipe.id, newRecipe)
    .subscribe((recipes: Meal[]) => {
      this.recipes = recipes;
      this.recipesListChanged.next(this.recipes.slice());
    });
  }

  deleteRecipe(meal: Meal) {
    if (!meal) {
      console.log('No meal passed!');
      return;
    }

    const pos = this.recipes.indexOf(meal);
    if (pos < 0) {
      return;
    }

    this.http.delete<Meal[]>('http://localhost:3000/recipes/' + meal.id)
    .subscribe((recipes: Meal[]) => {
      this.recipes = recipes;
      this.recipesListChanged.next(this.recipes.slice());
    });
  }
}
