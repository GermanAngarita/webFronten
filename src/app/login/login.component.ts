import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService  } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  

  user = {
    email:'',
    password:''
  }
  response:any=[]
  message:any = ''
  getUser:any = []

  constructor( private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    localStorage.clear()
  }

  getNewPass():void {
    if(this.user.email){
      this.userService.getNewPass(this.user)
    .subscribe( getNewPass => window.alert(`Se ha enviado un correo a; ${this.user.email} una nueva contraseña`) )
    } else {
      window.alert('Por favor escribe un correo electronico')
    }
  }

  singIn():void{
    this.response=[]
    this.message = ''
    this.userService.singIn(this.user)
    .subscribe( response => { 
      this.response = JSON.parse(response); 
      this.setLocalStore(response)
      this.getUserByEmail()
    },   
                err =>{ 
      this.message = err } )
  }

  goTo(): void {
    this.router.navigateByUrl('dashboard');
  }
  login(): void {
    this.goTo();
  }
  setLocalStore(token: any): void {
    const tokenSave = JSON.parse(token);
    localStorage.setItem('token', JSON.stringify(tokenSave.token));
  }
  getUserByEmail():void {
    this.userService.getUserByEmail(this.user)
    .subscribe( getUserByEmail => {this.getUser = JSON.parse(getUserByEmail); this.handRoutes(JSON.parse(getUserByEmail))} )
    
  }
  handRoutes(user:any):void{
    localStorage.setItem('user', JSON.stringify(user));
    switch(user.role){
      case 'manager': this.router.navigate(['dashboard']); break
      case 'dealers': this.router.navigate(['dealer']); break
      case 'service': this.router.navigate(['dashboard']); break
      case 'adviser': this.router.navigate(['adviser']); break
    }
    console.log(user.role)
  }

  closeAlert(){
    this.message = ''
  }



}
