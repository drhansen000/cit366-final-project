import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './common/top-nav/top-nav.component';
import { MealListComponent } from './meals/meal-list/meal-list.component';
import { MealDetailComponent } from './meals/meal-detail/meal-detail.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { AccountComponent } from './account/account.component';
import { RecipeComponent } from './recipes/recipe.component';
import { MealComponent } from './meals/meal.component';
import { FormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { MealItemComponent } from './meals/meal-list/meal-item/meal-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    MealListComponent,
    MealDetailComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RegisterComponent,
    LoginComponent,
    AccountComponent,
    RecipeComponent,
    MealComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    MealItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
