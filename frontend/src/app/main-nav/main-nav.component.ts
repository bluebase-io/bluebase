import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService,
  private router: Router) {}

  public signout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
  public toDashboard() {
    this.router.navigate(['/']);
  }

  public toApiKeyPage() {
    this.router.navigate(['/api-keys']);
  }
}
