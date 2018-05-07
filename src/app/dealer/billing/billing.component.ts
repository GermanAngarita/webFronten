import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../services/dealer.service';
import { VioService } from '../../services/vio.service';
import { ModelService } from '../../services/model.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user'));
  dealers:any=[]
  year: any = []
  model: any = []
  statusWarranty: any = []
  modelConvention:any=[]
  filter: any = {
    dealer:[],
    year:[],
    model:[],
    uw:[]
  }
  modelDetail:any=[]

  ByBillPerYear:any=[]

  // Charts Data
  view=[800, 300]
  viewPieGrid =[1000,600]
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Billing Date';
  showYAxisLabel = true;
  yAxisLabel = 'Units';
  bandColor = "#BB162B";
  // cardNumber = [600, 250]
  gridPieChart={ domain:[ '#BB162B' ]}
  colorNumberCard = {domain: ['#E4E5E6']}
  colorScheme = {domain: ['#BB162B', '#448D76', '#FB8604', '#342009', '#EA202C', '#FD3A0F']}


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
    this.getAllModelCode();
    this.getData()
  }
  getData(): void {
    this.getByBillPerYear()

  }
  getByBillPerYear():void{
    this.vioService.getByBillPerYear(this.filter)
    .subscribe( ByBillPerYear => this.ByBillPerYear = JSON.parse(ByBillPerYear))
  }
  getAllModelCode():void{
    this.vioService.getAllModelCode()
    .subscribe( getAllModelCode => this.modelConvention = getAllModelCode)
  }

  onSelect($event){
    console.log($event)
    this.modelDetail = []
    for(let i=0; i<this.ByBillPerYear.length;i++){
      if(this.ByBillPerYear[i].name == $event.name){
        this.modelDetail[0] = this.ByBillPerYear[i]
      }
    }

  }

}
