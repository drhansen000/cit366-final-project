import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { RecipeComponent } from './recipes/recipe.component';
import { MealComponent } from './meals/meal.component';
import { OrderComponent } from './orders/order.component';
import { StarredDetailComponent } from './home/starred-detail/starred-detail.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { MealDetailComponent } from './meals/meal-detail/meal-detail.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'account', component: AccountComponent},
  {path: 'home', component: HomeComponent},
  {path: 'starred/:id', component: StarredDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recipes', component: RecipeComponent, children: [
    {path: ':id', component: RecipeDetailComponent}
  ]},
  {path: 'meals', component: MealComponent, children: [
    {path: ':id', component: MealDetailComponent}
  ]},
  {path: 'orders', component: OrderComponent, children: [
    {path: ':id', component: OrderDetailComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
