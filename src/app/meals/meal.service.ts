import { Injectable, EventEmitter } from '@angular/core';
import { Meal } from './meal.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  meals: Meal[] = [];
  mealSelectedEvent = new EventEmitter<Meal>();
  mealsListChanged = new EventEmitter<Meal[]>();
  
  constructor(private http: HttpClient) { 
    this.getMeals();
  }

  getMeals() {
    this.http.get<Meal[]>('http://localhost:3000/meals')
    .subscribe(meals => {
      this.meals = meals;
      this.mealsListChanged.emit(this.meals.slice());
    });
  }

  getMeal(id: number): Meal {
    for (const meal of this.meals) {
      if (meal.id === id) {
        return meal;
      }
    }
    return null;
  }
}
