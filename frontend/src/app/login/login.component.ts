import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public backendUrl: String = environment.nestjsBackend.url + '/api/auth/google';

  constructor(private router: Router) { }

  ngOnInit() {

  }
}
