import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const accountId = this.accountService.maxAccountId;
    const account = new Account(accountId, values.name, values.phone, values.email, values.password);
    this.accountService.createAccount(account);
    this.router.navigate(['login']);
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
