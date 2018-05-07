import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../../services/dealer.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  dealers:any=[]
  token:any=[]
  groupSelect:any
  user:any = {
    name:'',
    last_name:'',
    email:'',
    role:'',
    group:'All',
    password:'',
    c_password:'',
    dealer:[]
  }
  msg:any=[]
  constructor( private dealerServices: DealerService, private userService:UserService ) { }

  ngOnInit() {
    this.dealerServices.getDealerByGroup().subscribe( dealerByGroup => { this.dealers = dealerByGroup} )
  }

  saveUser():void{
    if(this.user.name && this.user.last_name && this.user.email && this.user.role && this.user.password && this.user.c_password){
      if(this.user.role == 'manager' || this.user.role == 'service'){
        for(let i = 0; i < this.dealers.length; i++){
          for( let x=0; x<this.dealers[i].cl.length; x++){
            this.user.dealer.push(
              this.dealers[i].cl[x].cl
            )
          }
        }
        //aqui el servicio
        this.singup()
      } else if( this.user.role == 'dealers' || this.user.role == 'adviser' ){
        for(let i = 0; i < this.dealers.length; i++){
          for( let x=0; x<this.dealers[i].cl.length; x++){
            if( this.dealers[i].cl[x].select){
              this.user.dealer.push(
                this.dealers[i].cl[x].cl
              )
            }
          }
        }
        this.singup()
      }
    } else {
      this.msg={msg:'Por favor completa todos los datos',type:'info'}
    }
    
  }

  public closeAlert(){
    this.msg = []
  }

  singup(): void{
    this.userService.singUp(this.user)
    .subscribe( (token) => {this.token = token, this.user= {
      name:'',
      last_name:'',
      email:'',
      role:'',
      group:'All',
      password:'',
      c_password:'',
      dealer:[]
    }, this.msg={msg:'Se ha credo el usuario',type:'success'}})
  }

  

}
