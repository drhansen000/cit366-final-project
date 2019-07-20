import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { Meal } from 'src/app/meals/meal.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private accountService: AccountService, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const mealId = -1;
    const cookId = this.accountService.accountId;
    const newRecipe = new Meal(
      mealId,
      values.name,
      values.description,
      values.ingredients,
      values.imageUrl,
      cookId
    );
    this.recipeService.addRecipe(newRecipe);
    this.router.navigate(['/recipes']);
  }
}
