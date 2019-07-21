import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meal } from 'src/app/meals/meal.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  recipe: Meal = null;

  constructor(private accountService: AccountService, private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = +params.id;
      if (!id) {
        this.editMode = false;
        return;
      }
      const originalRecipe = this.recipeService.getRecipe(id);
      if (!originalRecipe) {
        return;
      }

      this.editMode = true;
      this.recipe = JSON.parse(JSON.stringify(originalRecipe));
    });
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    let mealId: number;
    if (!this.editMode) {
      mealId = -1;
    } else {
      mealId = this.recipe.id;
    }
    const cookId = this.accountService.accountId;
    const newRecipe = new Meal(
      mealId,
      values.name,
      values.description,
      values.ingredients,
      values.imageUrl,
      cookId
    );
    if (!this.editMode) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.updateRecipe(this.recipe, newRecipe);
    }
    this.router.navigate(['/recipes']);
  }
}
