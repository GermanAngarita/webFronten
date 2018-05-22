import { Component, OnInit } from '@angular/core';
import { Vio } from '../../../class/vio';
import { Model } from '../../../class/model';
import { Dealer } from '../../../class/dealer';
import { DealerService } from '../../../services/dealer.service';
import { VioService } from '../../../services/vio.service';
import { ModelService } from '../../../services/model.service';
import * as moment from 'moment/moment';
import { Router, ActivatedRoute } from '@angular/router';
import { Jsonp } from '@angular/http';

@Component({
  selector: 'app-vio-general',
  templateUrl: './vio-general.component.html',
  styleUrls: ['./vio-general.component.css']
})
export class VioGeneralComponent implements OnInit {

  dealers: any = []
  year: any = []
  model: any = []
  filter: any = {
    dealer:[],
    year:[],
    model:[]
  }
  today:any;
  vFilterDealer:boolean;
  vFilterYear:boolean;
  vFilterModel:boolean;

  getByBillDate:any=[]
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Billed Vehicles';
  colorScheme = {
    domain: ['#D8D8D8', '#F2F2F2', '#CECEF6', '#CEF6F5']
  };

  constructor(private route: ActivatedRoute,
    private router: Router, private vioService: VioService, private dealerService: DealerService, private modelService: ModelService ) { 
  }

  ngOnInit() {
    this.initServices()
    this.getYears()
    
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
    this.dealerService.getDealerByZone().subscribe( getDealerByZone => { this.dealers = getDealerByZone })
    this.vioService.getModels().subscribe( models => {this.model = models; this.setFilter() } )
  }

  getData(): void {
    this.vioService.getByBillDate(this.filter).subscribe( getByBillDate => { this.getByBillDate = JSON.parse(getByBillDate) })
  }

  setFilter(){
    this.setFilterDealer();
    this.setFilterYear();
    this.setFilterModel();
    this.getData();
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

  
}
