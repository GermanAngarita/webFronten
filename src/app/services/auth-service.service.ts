import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthServiceService {

  jwtHelper = new JwtHelperService();

  constructor( ) { }

  public isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('token'));

    return !this.jwtHelper.isTokenExpired(token);
  }

}
