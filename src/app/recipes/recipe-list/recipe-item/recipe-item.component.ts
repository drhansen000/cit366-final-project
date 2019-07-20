import { Component, OnInit, Input } from '@angular/core';
import { Meal } from 'src/app/meals/meal.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Meal;
  constructor() { }

  ngOnInit() {
    console.log(this.recipe);
  }

}
