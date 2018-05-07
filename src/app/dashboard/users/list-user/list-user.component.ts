import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DealerService } from '../../../services/dealer.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users:any = []
  dealers:any=[]
  confirmDeletUser:boolean = false
  closeResult:string
  userToedit:any = {
    name:'',
    last_name:'',
    email:'',
    role:'',
    group:'All',
    password:'',
    c_password:'',
    dealer:[]
  }
  userToDelet:any=[]
  modalReference:any;
  modalConfirm:any;

  constructor( private userService:UserService, 
    private modalService:NgbModal,
    private dealerServices:DealerService,
    public modalInstance:NgbActiveModal
    ) { }

  ngOnInit() {
    this.getUsers()
    this.dealerServices.getDealerByGroup().subscribe( dealerByGroup => { this.dealers = dealerByGroup} )
    
  }

  open(content){
    this.modalReference = this.modalService.open(content, {
      size:'lg'
    })
    this.modalReference.result.then((result)=>{
      this.closeResult = `Close with ${result}`;
    }, (reason)=>{
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    })
  }
  private getDismissReason(reason: any): string {
    if(reason === ModalDismissReasons.ESC){
      return 'by pressing ESC'
    } else if( reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking backdrop click'
    } else {
      return `whith; ${reason}`
    }
  }

  getUsers():void{
    this.userService.getUsers()
    .subscribe( users => this.users = users )
  }
  
  updateDealer(user:any):void {
    this.userToedit = user;
    for(let i=0; i<this.dealers.length; i++){
      for(let x=0; x<this.dealers[i].cl.length; x++){
        this.dealers[i].cl[x].select = false
      }
    }

    for(let i=0; i<this.dealers.length; i++){
      for(let x=0; x<this.dealers[i].cl.length; x++){
        for(let y=0; y<this.userToedit.dealer.length; y++){
          if(this.dealers[i].cl[x].cl == this.userToedit.dealer[y]){
            this.dealers[i].cl[x].select = true
          }
        }
      }
    }
  }

  changeRole():void{
    if(this.userToedit.role == 'adviser' || this.userToedit.role == 'dealers'){
      this.userToedit.dealer = []
    } else if(this.userToedit.role == 'manager' || this.userToedit.role == 'service'){
      this.userToedit.group = 'All'
    }
    this.updateDealer(this.userToedit)
  }

  clearClfromUser():void{
    this.userToedit.dealer = []
  }

  updateUser():void{

    if(this.userToedit.newPassword && this.userToedit.newPasswordc){
      if(this.userToedit.newPassword === this.userToedit.newPasswordc){
        this.userToedit.password = this.userToedit.newPassword
      }
    }

    if(this.userToedit.role == 'manager' || this.userToedit.role == 'service'){
      for(let i = 0; i < this.dealers.length; i++){
        for( let x=0; x<this.dealers[i].cl.length; x++){
          this.userToedit.dealer.push(
            this.dealers[i].cl[x].cl
          )
        }
      }
      //aqui el servicio
      this.userService.updateUser(this.userToedit)
    .subscribe(updateUser => {window.alert(JSON.stringify(updateUser)),this.modalReference.close()} )
    } else if( this.userToedit.role == 'dealers' || this.userToedit.role == 'adviser' ){
      for(let i = 0; i < this.dealers.length; i++){
        for( let x=0; x<this.dealers[i].cl.length; x++){
          if( this.dealers[i].cl[x].select){
            this.userToedit.dealer.push(
              this.dealers[i].cl[x].cl
            )
          }
        }
      }
      this.userService.updateUser(this.userToedit)
    .subscribe(updateUser => {window.alert(JSON.stringify('Se han guardado los cambios')), this.modalReference.close()})
    }

    
  }

  confirmDelet(confirm, user): void {
    this.userToDelet = user
    this.modalConfirm = this.modalService.open(confirm, {
      centered:true
    })
    this.modalConfirm.result.then((result)=>{
      this.closeResult = `Close with ${result}`;
    }, (reason)=>{
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    })
  }

  deletUser(){
    this.confirmDeletUser = true
    if(this.confirmDeletUser){
      this.userService.deletUser(this.userToDelet)
      .subscribe( deletUser => {this.getUsers(), this.modalConfirm.close()})
      
    } 
  }
}
