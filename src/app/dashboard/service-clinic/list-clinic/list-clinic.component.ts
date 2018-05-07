import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../../services/clinic.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-list-clinic',
  templateUrl: './list-clinic.component.html',
  styleUrls: ['./list-clinic.component.css']
})
export class ListClinicComponent implements OnInit {

  constructor( private modalService:NgbModal, private router:Router, private clinicService:ClinicService) { }

  clinics:any = []
  clinicToDelet:any = []
  message:any = []
  modalConfirm:any;
  lenght:any=[]
  closeResult:string
  total:any = 10
  search:any = {
    page:0,
    maxSize:10
  } 
  
  ngOnInit() {
    this.getCount()
    this.getClinics('onInit')
  }

  getClinics(event:any): void {
    this.clinicService.getClinics(this.search)
    .subscribe( clinicService => this.clinics = JSON.parse(clinicService) )
  }

  getCount(){
    this.clinicService.getLength()
    .subscribe( getLength => {this.lenght = getLength, this.total = this.lenght.count})
  }

  deletClinic(): void{
    this.clinicService.deletClinic(this.clinicToDelet)
    .subscribe( deletClini => {this.message = JSON.parse(deletClini), this.getClinics('onUp'), this.getCount()})
  }
  info(clinic:any):void{
    let id=clinic._id
    this.router.navigateByUrl('/dashboard/serviceClinic/clinicdetails/'+id)
  }

  confirmDelet(confirm, user): void {
    this.clinicToDelet = user
    this.modalConfirm = this.modalService.open(confirm, {
      centered:true
    })
    this.modalConfirm.result.then((result)=>{
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



}
