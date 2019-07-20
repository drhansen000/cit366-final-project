import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    this.accountService.accountLogin(values.email, values.password);
  }

}
