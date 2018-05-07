import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../../services/dealer.service';
import { ClinicService } from '../../../services/clinic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-report-clinic',
  templateUrl: './report-clinic.component.html',
  styleUrls: ['./report-clinic.component.css']
})
export class ReportClinicComponent implements OnInit {
  
  fDate:any = {
    year:parseInt(moment().format('YYYY')) ,
    month:1,
    day:1
  }
  tDate:any = {
    year:parseInt(moment().format('YYYY')) ,
    month:12,
    day:31
  }
  dealerSelect:any = 'all'
  dealerGroup:any=[]
  search:any = {
    fromDate:'',
    toDate:'',
    group:[]
  }
  clinicResume:any=[]
  clinicCot:any=[]
  byClinic:any=[]

  showLegend = true
  showLabels = true
  explodeSlices = false
  AdvancedPieChart = {
    domain: ['#BB162B', '#448D76', '#FB8604', '#342009', '#EA202C', '#FD3A0F']
  }
  // fromDate = moment(this.fDate.year+'-'+this.fDate.month+'-'+this.fDate.day,'YYYY-MM-DD')
  constructor( private router:Router, private dealerService:DealerService, private clinicService:ClinicService) { }

  ngOnInit() {
    this.getDealerByGroup()
  }

  getDealerByGroup(): void {
    this.dealerService.getDealerByGroup()
    .subscribe( dealerByGroup => {this.dealerGroup = dealerByGroup, this.setFilter()})
  }

  reportClinicResume(): void{
    this.clinicResume = []
    this.clinicService.reportClinicResume(this.search)
    .subscribe( clinicResume => this.clinicResume = JSON.parse(clinicResume))
  }
  reportClinicCot():void{
    this.clinicCot = []
    this.clinicService.reportClinicCot(this.search)
    .subscribe( clinicCot => this.clinicCot = JSON.parse(clinicCot) )
  }
  reportByClinic():void{
    this.byClinic = []
    this.clinicService.getReportByClinic(this.search)
    .subscribe( getReportByClinic => this.byClinic = JSON.parse(getReportByClinic) )
  }

  setFilter():void{
    // paso 1 vaciar los filtros anteriores
    this.search= {
      fromDate:'',
      toDate:'',
      group:[]
    }
    // paso 2 comprobar que los nuevos tengan la información completa
    if(this.fDate == null){
      window.alert('la seleccion no es valida')
    } else {
      if((!this.fDate.day || !this.tDate.day)){
        return window.alert('Selecciona las fechas')
      } else {
        this.search.fromDate = moment(this.fDate.year+'-'+this.fDate.month+'-'+this.fDate.day, 'YYYY-MM-DD')
        this.search.toDate = moment(this.tDate.year+'-'+this.tDate.month+'-'+this.tDate.day, 'YYYY-MM-DD').add(1,'days')
        if(this.search.fromDate > this.search.toDate){
          return window.alert('Estas fechas no tienen sentido')
        } else {
          if(this.dealerSelect === 'all'){
            this.search.group = []
            for(let d =0;d< this.dealerGroup.length; d++){
              this.search.group.push(
                this.dealerGroup[d].group
              )
            }
          } else {
            this.search.group.push(
              this.dealerSelect
            )
          }
          this.getReport()
        }
      }
    }


  }
  info(clinic:any):void{
    let id=clinic.id
    this.router.navigateByUrl('/dashboard/serviceClinic/clinicdetails/'+id)
  }

  getReport():void{
    // this.setFilter()
    this.reportClinicResume()
    this.reportClinicCot()
    this.reportByClinic()
  }

}
