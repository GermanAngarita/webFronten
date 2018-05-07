import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthGuardService {

  constructor( public router:Router, public authService: AuthServiceService ) { }

  canActivate(): boolean {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['login']);
      return false
    }
    return true
  }

}
