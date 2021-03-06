import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../account.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const values = form.value;
    this.accountService.accountLogin(values.email, values.password);
    this.router.navigate(['/meals']);
  }

  ngOnDestroy() {}
}
