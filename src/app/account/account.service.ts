import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from 'src/app/account/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  accounts: Account[] = [];
  loggedIn = false;
  accountId = -1;
  account: Account;
  maxAccountId = 0;

  constructor(private http: HttpClient) {
    this.getAccountMaxId();
  }

  ngOnInit(): void {}

  /*
    TODO: There should only be one account per window. It should be accessed via login and verification.
  */
  getAccounts() {
    this.http
    .get<Account[]>('http://localhost:3000/accounts')
    .subscribe(accounts => {
      this.accounts = accounts;
    },
    error => {
      console.log('ERROR: Getting accounts failed.');
      console.log(error);
    });
  }

  // Get the next available account id
  getAccountMaxId() {
    this.http
    .get<{id: number}>('http://localhost:3000/accounts/getMaxId')
    .subscribe(maxAccountId => {
      if(maxAccountId && maxAccountId.id >= 0) {
        this.maxAccountId = maxAccountId.id;
      }
    },
    error => {
      console.log('ERROR: Failed to get max account id.');
      console.log(error);
    });
  }

  // Find the email in the database and verify the password.
  accountLogin(email: string, password: string) {
    this.http
    .post<Account>('http://localhost:3000/accounts/login', {accountEmail: email, accountPassword: password})
    .subscribe(response => {
      const responseObject = JSON.parse(JSON.stringify(response));
      if (responseObject.message) {
        alert(responseObject.message);
      } else {
        this.account = response;
        this.accountId = this.account.id;
        this.loggedIn = true;
      }
    },
    error => {
      console.log('ERROR: Getting account with email ' + email + ' failed');
      console.log(error);
    });
  }

  // Create an account
  createAccount(newAccount: Account) {
    this.http
    .post('http://localhost:3000/accounts', newAccount)
    .subscribe(account => {
      this.getAccountMaxId();
    },
    error => {
      console.log('ERROR: Failed to create account');
      console.log(error);
    });
  }

  // Change the currently logged in to account with the new information provided.
  updateAccount() {

  }

  /*
    TODO: Should I do this?
    Check if the password matches the password in the database.
    This could be done in the initial login and before any account changes are submitted to the server.
   */
  passwordVerification() {

  }

  // TODO: Should I do this? Enable the user to delete their account. This will also delete all of their recipes.
  deleteAccount() {

  }

}
