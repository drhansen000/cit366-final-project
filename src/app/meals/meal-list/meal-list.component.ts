import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meal } from '../meal.model';
import { Subscription } from 'rxjs';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit, OnDestroy {
  meals: Meal[] = [];
  mealListSubscription: Subscription;

  constructor(private mealService: MealService) { }

  ngOnInit() {
    this.mealListSubscription = this.mealService.mealsListChanged.subscribe((meals: Meal[]) => {
      this.meals = meals;
    });
    this.mealService.getMeals();
  }

  ngOnDestroy() {
    this.mealListSubscription.unsubscribe();
  }

}
