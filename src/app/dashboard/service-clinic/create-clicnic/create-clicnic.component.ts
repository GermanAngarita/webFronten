import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ClinicService } from '../../../services/clinic.service';
import * as moment from 'moment/moment';

const equals = ( one: NgbDateStruct, two: NgbDateStruct )=> 
one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = ( one: NgbDateStruct, two: NgbDateStruct )=>
!one || !two ? false: one.year === two.year ? one.month === two.month ? one.day === two.day ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = ( one: NgbDateStruct, two: NgbDateStruct ) =>
!one || !two ? false: one.year === two.year ? one.month === two.month ? one.day === two.day ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-create-clicnic',
  templateUrl: './create-clicnic.component.html',
  styleUrls: ['./create-clicnic.component.css']
})
export class CreateClicnicComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user'));
  hoveredDate: NgbDateStruct;
  cacthValue:string;
  modelCod:any=[];
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  closeResult:string
  serviceInclude:any = []
  sClinic = {
    title:'',
    description:'',
    from_date: '',
    to_date:'',
    estimated_cost:'',
    user:{ name:'', email:'', role:''},
    serviceInclude:'',
    cod:''
  }
  modalConfirm:any;
  private getDismissReason(reason: any): string {
    if(reason === ModalDismissReasons.ESC){
      return 'by pressing ESC'
    } else if( reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking backdrop click'
    } else {
      return `whith; ${reason}`
    }
  }

  constructor( private clinicService:ClinicService, 
    calendar: NgbCalendar, 
    private modalService:NgbModal,
    public modalInstance:NgbActiveModal) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 5);
  }

  ngOnInit() {
    

  }

  onDateSelection(date: NgbDateStruct){
    if(!this.fromDate && !this.toDate){
      this.fromDate = date;
    } else if( this.fromDate && !this.toDate && after(date, this.fromDate)){
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  createClinic(success): void{
    if(this.fromDate && this.serviceInclude){
      this.sClinic.from_date = this.fromDate.day+'/'+this.fromDate.month+'/'+this.fromDate.year
      this.sClinic.to_date = this.toDate.day+'/'+this.toDate.month+'/'+this.toDate.year
      this.sClinic.serviceInclude = this.serviceInclude
      this.sClinic.user.email = this.user.email;
      this.sClinic.user.name = this.user.name +' '+this.user.last_name;
      this.sClinic.user.role = this.user.role;
      this.sClinic.cod = this.user.group[0]+this.user.group[1]+this.user.group[2]+this.fromDate.year+'['+this.fromDate.month+']'+this.fromDate.day+'-'+this.toDate.day

      if(this.sClinic.title && this.sClinic.description && this.sClinic.estimated_cost){
        this.clinicService.newClinic(this.sClinic)
        .subscribe( newClinic => { this.succes(success)})
      } else {
        window.alert('Completa el formulario')
      }
    } else {
      window.alert('select a fuk u field')
    }
  }

  succes(success):void{
    this.modalConfirm = this.modalService.open(success, {
      centered:true
    })
    this.modalConfirm.result.then((result)=>{
      this.closeResult = `Close with ${result}`;
      this.sClinic = {
        title:'',
        description:'',
        from_date: '',
        to_date:'',
        user:{ name:'', email:'', role:''},
        estimated_cost:'',
        serviceInclude:'',
        cod:''
      }
    }, (reason)=>{
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      this.sClinic = {
        title:'',
        description:'',
        from_date: '',
        to_date:'',
        user:{ name:'', email:'', role:''},
        estimated_cost:'',
        serviceInclude:'',
        cod:''
      }
    })
  }

  addService(value:any): void {
    this.serviceInclude.push({
      service: value
    })
  }
  deletService(item): void {
    let index = this.serviceInclude.indexOf(item)
    this.serviceInclude.splice(index, 1)
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

}
