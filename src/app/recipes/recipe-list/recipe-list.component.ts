import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  cookId: number;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.cookId = this.accountService.accountId;
  }

}
