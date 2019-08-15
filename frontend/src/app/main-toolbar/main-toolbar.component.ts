import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {


  ngOnInit() {
  }

  constructor(
    private auth: AuthService,
    private router: Router) {}

    public signout() {
      this.auth.signOut();
    }

    public toApiKeyPage() {
      this.router.navigate(['/api-keys']);
    }

}
