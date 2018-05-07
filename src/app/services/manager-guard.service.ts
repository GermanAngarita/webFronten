import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class ManagerGuardService {

  private user =  JSON.parse(localStorage.getItem('user'));

  constructor( public router:Router, public authService: AuthServiceService ) { }

  canActivate(): boolean {

    if(this.authService.isAuthenticated() && (this.user.role === 'manager')){
      return true
    } else {
      window.confirm('No tienes permisos para acceder al administrador')
      this.router.navigate(['login']);
      return false
    }
  }
}
