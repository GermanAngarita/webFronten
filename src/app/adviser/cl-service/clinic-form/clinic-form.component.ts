import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../../services/clinic.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.css']
})
export class ClinicFormComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user'));
 clinicId:any=[]
 clinic:any =[]
 today:any = moment()
 message:any = []
 newReg:any={
   idClinic:'',
   titleClinic:'',
   placa:'',
   mo:'',
   repuestos:'',
   comentarios:'',
   group:this.user.group,
   user:{ name:'', email:'', role:''},
   cl: this.user.dealer[0]
 }
 modalConfirm:any;
 closeResult:any;
  constructor( private clinicService:ClinicService, 
    private activeRoute:ActivatedRoute,
    private modalService:NgbModal,
    public modalInstance:NgbActiveModal) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params)=>{
      this.clinicId = params['id'];
      this.getOneClinic()
     })
  }

  getOneClinic(): void{
    this.clinicService.getOneClinic(this.clinicId)
    .subscribe( clinic => this.clinic = JSON.parse(clinic))
  }

  reqClinicVisit(success): void {
    if(this.newReg.placa && this.newReg.mo && this.newReg.repuestos){
      this.newReg.placa = this.newReg.placa.toUpperCase()
      this.newReg.clinicId = this.clinicId
      this.newReg.titleClinic = this.clinic.title
      this.newReg.user.email = this.user.email;
      this.newReg.user.name = this.user.name +' '+this.user.last_name;
      this.newReg.user.role = this.user.role;


      this.clinicService.reqClinicVisit(this.newReg)
      .subscribe( reqClinicVisit => {
        this.message = JSON.parse(reqClinicVisit),
        this.succes(success);
      })
    } else {
      this.succes(success)
      this.message = { message:'Por favor diligencia todos los campos'}
    }
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

  succes(success):void{
    this.modalConfirm = this.modalService.open(success, {
      centered:true
    })
    this.modalConfirm.result.then((result)=>{
      this.closeResult = `Close with ${result}`;
      this.newReg={
        idClinic:'',
        titleClinic:'',
        placa:'',
        mo:'',
        repuestos:'',
        comentarios:'',
        group:this.user.group,
        user:{ name:'', email:'', role:''},
        cl: this.user.dealer[0]
      }
      
    }, (reason)=>{
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      this.newReg={
        idClinic:'',
        titleClinic:'',
        placa:'',
        mo:'',
        repuestos:'',
        comentarios:'',
        group:this.user.group,
        user:{ name:'', email:'', role:''},
        cl: this.user.dealer[0]
      }
      
    })
  }

}
