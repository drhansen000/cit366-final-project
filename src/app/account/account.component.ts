import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    if(this.accountService.accountId === -1) {
      alert('You must be logged in before trying to edit your account!');
      this.router.navigate(['/login']);
    }

  }
}
