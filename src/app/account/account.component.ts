import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { Account } from './account.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  account: Account;
  accountChangedSubscription: Subscription;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    if (this.accountService.accountId === -1) {
      alert('You must be logged in before trying to edit your account!');
      this.router.navigate(['/login']);
    }
    this.account = this.accountService.account;
    this.accountChangedSubscription = this.accountService.AccountChangedEvent.subscribe((account: Account) => {
      this.account = account;
    });
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const newAccount = new Account(this.account.id, values.name, values.phone, values.email, values.password);
    this.accountService.updateAccount(this.account, newAccount);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.accountChangedSubscription.unsubscribe();
  }
}
