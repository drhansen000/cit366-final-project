import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Router } from '@angular/router';
import { Meal } from 'src/app/meals/meal.model';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  cookId: number;
  recipes: Meal[] = [];
  recipeListSubscription: Subscription;

  constructor(private accountService: AccountService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.cookId = this.accountService.accountId;
    this.recipeListSubscription = this.recipeService.recipesListChanged.subscribe((recipes: Meal[]) => {
      this.recipes = recipes;
    });
    this.recipeService.getRecipes(this.cookId);
  }

  ngOnDestroy() {
    this.recipeListSubscription.unsubscribe();
  }

}
