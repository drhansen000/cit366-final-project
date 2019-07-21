import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit, OnDestroy {
  loginSubscription: Subscription;
  loggedIn = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.loginSubscription = this.accountService.loginEvent.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

}
