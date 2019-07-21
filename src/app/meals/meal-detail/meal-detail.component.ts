import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {
  meal: Meal;
  constructor(private mealService: MealService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.meal = this.mealService.getMeal(+params.id);
    });
  }

}
