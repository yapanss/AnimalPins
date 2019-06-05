import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

   private _idToken: string;
   private _accessToken: string;
   private _expiresAt: number;
   private _email: string;
   private _name: string;
   private _avatar: string;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackURL
  });

  constructor(public router: Router) {
    this._idToken = localStorage.getItem('idToken') ? localStorage.getItem('idToken') : ''
    this._email = localStorage.getItem('email') ? localStorage.getItem('email') : undefined
    this._name = localStorage.getItem('name') ? localStorage.getItem('name') : undefined
    this._avatar = localStorage.getItem('avatar') ? localStorage.getItem('avatar') : ''
    this._accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''
    this._expiresAt = localStorage.getItem('expiresAt') ? JSON.parse(localStorage.getItem('expiresAt')) : 0
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private localLogin(authResult): void {
    console.log(authResult)
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    this._email = authResult.idTokenPayload.email;
    this._name = authResult.idTokenPayload.given_name || authResult.idTokenPayload.nickname;
    this._avatar = authResult.idTokenPayload.picture;

    localStorage.setItem('idToken', this._idToken);
    localStorage.setItem('accessToken', this._accessToken);
    localStorage.setItem('expiresAt', JSON.stringify(this._expiresAt));
    localStorage.setItem('email', this._email);
    localStorage.setItem('name', this._name);
    localStorage.setItem('avatar', this._avatar);
  }

  public renewTokens(): void {
    console.log('RENEW .....')
    this.auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.localLogin(authResult);
       } else if (err) {
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
         this.logout();
       }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < this._expiresAt;
  }

}
