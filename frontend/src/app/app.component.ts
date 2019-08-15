import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bluebase';
  showLogin = Object.is(this.auth.token, null);
  constructor(private router: Router, public auth: AuthService) {
    this.auth.token$.subscribe((res) => {
      this.showLogin = Object.is(res, null);
    });
  }
}
