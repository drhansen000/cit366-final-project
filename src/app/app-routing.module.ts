import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { RecipeComponent } from './recipes/recipe.component';
import { MealComponent } from './meals/meal.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { MealDetailComponent } from './meals/meal-detail/meal-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/meals', pathMatch: 'full'},
  {path: 'account', component: AccountComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recipes', component: RecipeComponent, children: [
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent},
    {path: ':id/edit', component: RecipeEditComponent}
  ]},
  {path: 'meals', component: MealComponent, children: [
    {path: ':id', component: MealDetailComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
