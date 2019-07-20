import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './common/top-nav/top-nav.component';
import { HomeComponent } from './home/home.component';
import { MealListComponent } from './meals/meal-list/meal-list.component';
import { MealDetailComponent } from './meals/meal-detail/meal-detail.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { StarredDetailComponent } from './home/starred-detail/starred-detail.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { AccountComponent } from './account/account.component';
import { RecipeComponent } from './recipes/recipe.component';
import { OrderComponent } from './orders/order.component';
import { MealComponent } from './meals/meal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    HomeComponent,
    MealListComponent,
    MealDetailComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    OrderListComponent,
    OrderDetailComponent,
    StarredDetailComponent,
    RegisterComponent,
    LoginComponent,
    AccountComponent,
    RecipeComponent,
    OrderComponent,
    MealComponent
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
