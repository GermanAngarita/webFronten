import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClinicService } from '../../../services/clinic.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
// import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'app-clinic-datails',
  templateUrl: './clinic-datails.component.html',
  styleUrls: ['./clinic-datails.component.css']
})
export class ClinicDatailsComponent implements OnInit {
  clinicId:any;
  registerByGroup:any=[]
  clinic:any =[]
  registers:any=[]
  resume:any=[]
  pieChart:any = []
  showLegend = true
  colorScheme = {
    domain:['#BB162B', '#7E8083']
  }
  colorBarScheme = {
    domain:['#BB162B', '#448D76', '#FB8604', '#342009', '#EA202C', '#FD3A0F']
  }
  showLabels = true
  explodeSlices = false
  doughnut = false
  gradient = true
  search:any = {
    page:0,
    maxSize:10
  }
  detailByGroup:any[]=[]

  constructor( private clinicService:ClinicService, private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params)=>{
     this.clinicId = params['id'];
     this.getOneClinic()
     this.getReqFromClinics('onInit')
     this.getReqResumen()
     this.getByGroup()
     this.getDetailByGroup()
    })
    
  }

  getOneClinic():void{
    this.clinicService.getOneClinic(this.clinicId)
    .subscribe( clinic => this.clinic = JSON.parse(clinic))
  }

  getReqFromClinics(event:any):void{
    this.clinicService.getReqFromClinics(this.clinicId, this.search)
    .subscribe( getReqFromClinics => this.registers = JSON.parse(getReqFromClinics) )
  }
  getReqResumen():void{
    this.clinicService.getReqResumen(this.clinicId)
    .subscribe( getReqResumen => {
      this.resume = JSON.parse(getReqResumen)
      if(this.resume.length>0){
        this.pieChart = [
          {
            name:'M.O.',
            value: this.resume[0].mo
          },
          {
            name:'Repuestos',
            value: this.resume[0].repuestos
          },
        ]
      }
    })
  }
  getByGroup():void{
    this.clinicService.getByGroup(this.clinicId)
    .subscribe(getByGroup => this.registerByGroup = JSON.parse(getByGroup))
  }
  getDetailByGroup():void{
    this.clinicService.getDetailByGroup(this.clinicId)
    .subscribe( getDetailByGroup => this.detailByGroup =  JSON.parse(getDetailByGroup) )
  }

}
