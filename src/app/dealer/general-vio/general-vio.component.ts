import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../services/dealer.service';
import { VioService } from '../../services/vio.service';
import { ModelService } from '../../services/model.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-general-vio',
  templateUrl: './general-vio.component.html',
  styleUrls: ['./general-vio.component.css']
})
export class GeneralVioComponent implements OnInit {

  private user = JSON.parse(localStorage.getItem('user'));
  dealers:any=[]
  year: any = []
  model: any = []
  statusWarranty: any = []
  filter: any = {
    dealer:[],
    year:[],
    model:[],
    uw:[]
  }

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
  bandColor = "#BB162B"
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

  constructor( private dealerService:DealerService, private vioService: VioService, private modelService: ModelService) { }

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
  initServices(){
    this.dealerService.getdealerByDealer(this.user)
    .subscribe( dealerByDealer =>{ this.dealers = JSON.parse(dealerByDealer)})
    this.vioService.getModels().subscribe( models => {this.model = models } )
    this.vioService.getStatusWarranty().subscribe( StatusWarranty => { this.statusWarranty = StatusWarranty; this.setFilter()})
  }

  setFilterDealer():void{
    this.filter.dealer=[]
    for(let i=0; i<this.dealers.length;i++){
      if(this.dealers[i].select){
        this.filter.dealer.push(
          this.dealers[i].d_cod
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
  getReportExcel(): void{
    this.vioService.getExcelReport(this.filter)
    .subscribe( res => {
      window.open('http://localhost:3001/api/downloadExcel')
    } )
  }

}
