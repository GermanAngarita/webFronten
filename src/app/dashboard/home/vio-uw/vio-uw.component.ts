import { Component, OnInit } from '@angular/core';
import { VinsService } from '../../../services/vins.service';
import { VioService } from '../../../services/vio.service';
import { DealerService } from '../../../services/dealer.service';
import { ModelService } from '../../../services/model.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-vio-uw',
  templateUrl: './vio-uw.component.html',
  styleUrls: ['./vio-uw.component.css']
})
export class VioUwComponent implements OnInit {
  info=[]
  vFilterDealer:boolean;
  vFilterYear:boolean;
  vFilterModel:boolean;
  vFilterWarranty:boolean;
  today = moment()
  dealers: any = []
  year: any = []
  model: any = []
  statusWarranty: any = []
  

  filter: any = {
    dealer:[],
    year:[],
    model:[],
    uw:[]
  }
  
  // Elementos del informe
  total:any=[];
  typeUse:any=[];
  totalByYear:any=[];
  totalByCl: any = [];
  totalByModel: any= [];
  totalByFrom: any=[];
  view: any[] = [500, 200]

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Vehicles';
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  bandColor = "#BB162B";
  AdvancedPieChart = {
    domain: ['#BB162B', '#448D76', '#FB8604', '#342009', '#EA202C', '#FD3A0F']
  }
  colorScheme = {
    domain: ['#7E8083']
  };
  colorNumberCard = {
    domain: ['#E4E5E6']
  }
  gridPieChart={
    domain:[ '#BB162B' ]
  }
  colorSchemePie = {
    domain: ['#BB162B', '#448D76', '#FB8604', '#342009', '#EA202C', '#FD3A0F']
  };
 
  constructor( private route: ActivatedRoute,
    private router: Router, 
    private vinService: VinsService, 
    private vioService: VioService,
    private dealerService: DealerService,
    private modelService: ModelService ) {}

  ngOnInit() {
    this.getYears()
    this.initServices()
    this.getData()
  }
  getYears(): void{
    for(let i = 0; i<15; i++){
      this.year.push({
        year:parseInt(moment().add(2, 'years').subtract(i, 'years').format('YYYY')),
        select:true
      });
    }
  }
  initServices(): void {
    this.dealerService.getDealerByZone().subscribe( getDealerByZone => { this.dealers = getDealerByZone })
    this.vioService.getModels().subscribe( models => {this.model = models } )
    this.vioService.getStatusWarranty().subscribe( StatusWarranty => { this.statusWarranty = StatusWarranty; this.setFilter()})
    // this.modelService.getModels().subscribe( models => this.modelsMaster = models )
    // this.dealerService.getDealers().subscribe( dealers => {this.dealersMaster = dealers})
    
  }
  getData(): void {
    this.getTotal()
    this.getTypeUse()
    this.getTotalByYear()
    this.getTotalByCl()
    this.getTotalByModel()
    this.getTotalByFrom()
  }

  getTotal(): void {
    this.vioService.getTotal(this.filter)
    .subscribe( total => this.total = JSON.parse(total))
  }
  getTypeUse(): void {
    this.vioService.getTypeuse(this.filter)
    .subscribe( typeUse => {this.typeUse = JSON.parse(typeUse)} )
  }
  getTotalByYear(): void {
    this.vioService.getTotalByYear(this.filter)
    .subscribe( totalByYear => { this.totalByYear = JSON.parse(totalByYear)})
  }
  getTotalByCl(): void {
    this.vioService.getTotalByCl(this.filter)
    .subscribe( totalByCl => { this.totalByCl = JSON.parse(totalByCl) })
  }
  getTotalByModel(): void {
    this.vioService.getTotalByModel(this.filter)
    .subscribe( totalByModel => { this.totalByModel= JSON.parse(totalByModel) })
  }

  getTotalByFrom(): void {
    this.vioService.getTotalByFrom(this.filter)
    .subscribe( totalByFrom =>{ this.totalByFrom = JSON.parse(totalByFrom) })
  }

  setFilterZone(){
    this.filter.dealer = []
    for(let i=0;i<this.dealers.length;i++){
      if(this.dealers[i].select){
        for(let x=0; x<this.dealers[i].cl.length; x++){
          this.dealers[i].cl[x].select = true
        }
      } else {
        for(let x=0; x<this.dealers[i].cl.length; x++){
          this.dealers[i].cl[x].select = false
        }
      }
    }
    for(let i=0;i<this.dealers.length;i++){
      for(let x=0; x<this.dealers[i].cl.length; x++){
        if(this.dealers[i].cl[x].select){
          this.filter.dealer.push(
            this.dealers[i].cl[x].cl
          )
        }
      }
    }
  }
  setFilterDealer(){
    this.filter.dealer = []
    for(let i=0;i<this.dealers.length;i++){
      for(let x=0; x<this.dealers[i].cl.length; x++){
        if(this.dealers[i].cl[x].select){
          this.filter.dealer.push(
            this.dealers[i].cl[x].cl
          )
        }
      }
    }
  }
  setFilterYear(){
    this.filter.year=[]
    for(let i=0; i<this.year.length; i++){
      if(this.year[i].select){
        this.filter.year.push(
          this.year[i].year
        )
      }
    }
  }
  setFilterAllYear(selectAllYear:boolean){
    if(selectAllYear){
      for(let i=0; i<this.year.length; i++){
        this.year[i].select = true
      }
    } else {
      for(let i=0; i<this.year.length; i++){
        this.year[i].select = false
      }
    }
    this.setFilterYear()
  }
  setFilterModel(){
    this.filter.model=[]
    for(let i=0; i<this.model.length; i++){
      if(this.model[i].select){
        this.filter.model.push(
          this.model[i].model
        )
      }
    }
  }
  setFilterAllModel(selectAllModel){
    if(selectAllModel){
      for(let i=0; i<this.model.length; i++){
        this.model[i].select = true
      }
    } else {
      for(let i=0; i<this.model.length; i++){
        this.model[i].select = false
      }
    }
    this.setFilterModel()
  }
  setFilterUw(){
    this.filter.uw=[]
    for(let i=0; i<this.statusWarranty.length; i++){
      if(this.statusWarranty[i].select){
        this.filter.uw.push(
          this.statusWarranty[i].status
        )
      }
    }
  }
  setFilter(){
    this.setFilterDealer();
    this.setFilterYear();
    this.setFilterModel();
    this.setFilterUw();
    this.getData();
  }

  getReportExcel(): void{
    this.vioService.getExcelReport(this.filter)
    .subscribe( res => {
      window.open('http://localhost:3001/api/downloadExcel')
    } )
  }
  onSelect($event){
    this.info = $event
    console.log('Datos al hacer Click: '+$event.name)
  }

}
