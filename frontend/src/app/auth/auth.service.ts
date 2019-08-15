import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class AuthServiceConfig {
  url = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = '';
  public user;
  public token = localStorage.getItem('currentUser');
  public token$ = new BehaviorSubject(undefined);



  constructor(@Optional() config: AuthServiceConfig) {
    if (config) { this._url = config.url; }
    this.setToken(localStorage.getItem('currentUser'));
  }

  public setToken(newToken) {
    if (newToken) {
      localStorage.setItem('currentUser', newToken);
    } else {
      localStorage.removeItem('currentUser');
    }
    this.token = newToken;
    this.token$.next(newToken);
  }

  public signOut() {
    this.setToken(null);
  }

  get url() {
    return this._url;
  }}
