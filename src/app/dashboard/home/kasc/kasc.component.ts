import { Component, OnInit } from '@angular/core';
import { CrmsurveysService } from '../../../services/crmsurveys.service';
import { TicketService } from '../../../services/ticket.service';
import { DealerService } from '../../../services/dealer.service';
import { BarChartModule, LineChartModule} from '@swimlane/ngx-charts';
import { formatLabel } from '@swimlane/ngx-charts';
import * as moment from 'moment/moment';
import * as shape from 'd3-shape';
import * as d3 from 'd3';

@Component({
  selector: 'app-kasc',
  templateUrl: './kasc.component.html',
  styleUrls: ['./kasc.component.css']
})
export class KascComponent implements OnInit {

  private user = JSON.parse(localStorage.getItem('user'));
  //Prueba
  
  
  //Fin Objeto de prueba

  fDate:any = {
    year:parseInt(moment().subtract(1,'months').format('YYYY')) ,
    month:parseInt(moment().subtract(1,'months').format('MM')),
    day:1
  }
  tDate:any = {
    year:parseInt(moment().subtract(1,'months').format('YYYY')) ,
    month:parseInt(moment().subtract(1,'months').format('MM')),
    // day:parseInt(moment().format('DD'))
    day:30
  }
  kascDealer:any = {
    kasc:[],
  }
  kascDealerLast:any = []
  kascGeneral:any=[]
  indicatorSat:any=[]
  dcsiByDate:any=[]
  ticketByDate:any=[]
  contacto:any = []
  loyaltyByDealer:any = []
  loyaltyByDealerTri:any[] = []
  kascDetails:any = []
  revisitDetails:any = []
  recommend:any = []
  frftByDealer:any = []
  frftByDealerTri:any = []
  frftOffenders:any=[]
  frftTopOffenders:any=[]
  frftByPer:any = []
  dealerScore:any=[]
  dealerScoreColor:any=[]

  // Filtros
  dealerSelect:any = 'all'
  dealerByGroup:any= []
  search:any = {
    fromDate:'',
    toDate:'',
    group:[]
  }
  kacs:any = [
    {
      name: this.search.fromDate,
      series:[]
    },
    {
      name:"Trimestre",
      series:[]
    }
  ]
  // graficas
  showDataLabel = false
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Periodo';
  showYAxisLabel = true;
  yAxisLabel = '% KACS';
  customColor = []
  curve = shape.curveNatural

  //Option test
  comboBarScheme = {
    name: 'singleLightBlue',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#E4E5E6'
    ]
  };
  OneColor = {
    domain:['#F9EA2B']
  }
  normalizeColor = {
    domain: ['#FA98AD', '#F9EA2B', '#77F186']
  }
  loyaltyColor:any = []
  lineChartScheme = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#01579b', '#7aa3e5', '#a8385d', '#00bfa5','#e4e5e6', 
    ]
  };
  kacsScheme = {
    domain: [
      '#01579b', '#bb162b'
    ]
  }
  // view: any[] = [720,240]
  view: any[] = [1070,350]
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;
  schemeType: string = 'ordinal';

  // options
  
  legendTitle = 'Legend';
  tooltipDisabled = false;
  showGridLines = true;
  innerPadding = '10%';
  barPadding = 8;
  barPaddingNormalize = 50;
  groupPadding = 16;
  vertical2dPadding = 5;
  roundDomains = true;
  maxRadius = 10;
  minRadius = 3;
  showSeriesOnHover = true;
  roundEdges: boolean = true;
  animations: boolean = true;
  xScaleMin: any;
  xScaleMax: any;
  yScaleMin: number;
  yScaleMax: number = 1;
  //End option test

  constructor( private dealerService:DealerService, private crmService:CrmsurveysService,
  private ticketService:TicketService) { }

  ngOnInit() {
    this.getDealerByGroup()
    this.getKasc(),this.getKasclast()
    this.yRightAxisScale(0.5, 0.5)
  }
  getKasc():void{
    this.kascDealer = []
    this.crmService.getKasc(this.search)
    .subscribe( kascDealer => {
      this.kascDealer = JSON.parse(kascDealer),
      this.setColorScheme(this.kascDealer.kasc)
    } )
  }
  getKasclast():void{
    this.crmService.getKascLast(this.search)
    .subscribe( getKascLast => this.kascDealerLast = JSON.parse(getKascLast))
  }
  getindicatorSat():void{
    this.indicatorSat = []
    this.crmService.getIndicatorSat(this.search)
    .subscribe( indicatorSat => {this.indicatorSat = JSON.parse(indicatorSat),this.setColorSchemeLoyalty(this.indicatorSat[1]) })
  }
  getTicketByDate(): void{
    this.ticketByDate = []
    this.ticketService.getTicketByDate(this.search)
    .subscribe( ticketByDate => {this.ticketByDate = JSON.parse(ticketByDate),
      this.getTotal()})
  }
  getDcsiByDate():void{
    this.dcsiByDate = []
    this.crmService.getDcsiByDate(this.search)
    .subscribe( dcsiByDate => this.dcsiByDate = JSON.parse(dcsiByDate) )
  }
  getKascGeneral():void{
    this.kascGeneral = [];
    this.crmService.getkascGeneral(this.search)
    .subscribe( kascgeneral => this.kascGeneral = JSON.parse(kascgeneral))
  }
  getKacsResult():void{
    this.kacs[0].series = []
    this.crmService.getKacsResult(this.search)
    .subscribe( kacs => {this.kacs[0].series = JSON.parse(kacs),
      this.kacs[0].name = moment(this.search.fromDate).format('YYYYMM')
    } )
  }
  getKacsResultTrimonth():void{
    this.kacs[1].series = []
    this.crmService.getKacsResultTrimonth(this.search)
    .subscribe( kacsTrimonth => this.kacs[1].series = JSON.parse(kacsTrimonth) )
  }
  getDealerByGroup():void{
    this.dealerService.getDealerByGroup()
    .subscribe( dealerByGroup => {
      this.dealerByGroup = dealerByGroup,
      this.setFilter()
    } )
  }

  getLoyaltyByDealer():void{
    this.loyaltyByDealer = []
    this.crmService.getLoyaltyByDealer(this.search)
    .subscribe( loyalty => {this.loyaltyByDealer = JSON.parse(loyalty), this.getloyaltybyDealerTri()})
  }
  getloyaltybyDealerTri():void{
    this.loyaltyByDealerTri = []
    this.frftByDealerTri = []
    let search = this.search
    for(let i=0;i<3;i++){
      search.fromDate = moment(this.search.fromDate).subtract(1,'month').format('YYYYMMDD')
      search.toDate = moment(search.fromDate).add(1,'month').subtract(1,'days').format('YYYYMMDD')

      this.loyaltyByDealerTri.push({
        periodo: moment(search.fromDate).format('YYYYMM'),
        desde: search.fromDate,
        hasta: search.toDate,
        data: []
        
      })
      this.frftByDealerTri.push({
        periodo: moment(search.fromDate).format('YYYYMM'),
        desde: search.fromDate,
        hasta: search.toDate,
        data: []
        
      })
      
      this.crmService.getLoyaltyByDealer(search)
      .subscribe( loyalty => {
        this.loyaltyByDealerTri[i].data = JSON.parse(loyalty)
      })
      this.crmService.getFrftByDealer(search)
      .subscribe( frft => {
        this.frftByDealerTri[i].data = JSON.parse(frft)
      })
    }
  }

  getKascDetails(): void{
    this.kascDetails = []
    this.crmService.getKascDetails(this.search)
    .subscribe(getKascDetails => this.kascDetails = JSON.parse(getKascDetails))
  }
  getRevisitDetails():void{
    this.revisitDetails = []
    this.crmService.getRevisitDetails(this.search)
    .subscribe( revisitDetails => this.revisitDetails = JSON.parse(revisitDetails))
  }
  getRecommendDetails():void{
    this.recommend = []
    this.crmService.getRecommendDetails(this.search)
    .subscribe(recommend => this.recommend = JSON.parse(recommend))
  }
  getFrftByDealer():void{
    this.frftByDealer = []
    this.crmService.getFrftByDealer(this.search)
    .subscribe( frft => {this.frftByDealer = JSON.parse(frft)
      this.getfrftTopOffenders(JSON.parse(frft)),
      this.getDealerScore()
    })
  }
  getFrftOffenders():void{
    this.frftOffenders = []
    this.crmService.getFrftOffenders(this.search)
    .subscribe(frftOffenders => {this.frftOffenders = JSON.parse(frftOffenders)} )
  }
  getfrftTopOffenders(data):void{
    let dataTemp = data.data
    let search = {
      fromDate:this.fDate.year.toString() + this.fDate.month.toString() + this.fDate.day.toString(),
      toDate:this.tDate.year.toString() + this.tDate.month.toString() + this.tDate.day.toString(),
      group:[]
    }
    this.frftTopOffenders = []
      dataTemp.sort((a,b)=>{
        if(a.value > b.value){
            return 1
        }
        if(a.value > b.value){
            return -1
        }
        return -1;
      })
      search.group = []
      for(let i=0;i<5;i++){
        search.group.push(
          dataTemp[i].cl
        )

      }
      console.log(search)
      this.crmService.getfrftTopOffenders(search)
      .subscribe( frft => this.frftTopOffenders = JSON.parse(frft) )
      
  }

  getFrftbyPer():void{
    this.frftByPer = []
    this.crmService.getFrftbyPer(this.search)
    .subscribe( frft => {this.frftByPer = JSON.parse(frft)})
  }

  getDealerScore():void{
    this.dealerScore = []
    for(let kacs of this.kascDealer.kasc){
      if(this.loyaltyByDealer.data){
        for(let loy of this.loyaltyByDealer.data){
          for(let frft of this.frftByDealer.data){
            if((kacs.name == loy.name) && (kacs.name  == frft.name)){
              this.dealerScore.push({
                name:kacs.name,
                value:(kacs.value * 0.2)+(loy.value * 0.3)+( frft.value * 0.4 )+(100*0.1)
              })
            }
          }
          
        }
      }
    }
    this.dealerScore.sort((a,b)=>{
      if(a.value > b.value){
          return 1
      }
      if(a.value > b.value){
          return -1
      }
      return -1;
    })
    for(let i=0;i < this.dealerScore.length;i++){
      if(i<6){
        this.dealerScoreColor.push({
          name:this.dealerScore[i].name,
          value:'#FA98AD'
        })
      } else if(i>5 && i< this.dealerScore.length-5){
        this.dealerScoreColor.push({
          name:this.dealerScore[i].name,
          value:'#F9EA2B'
        })
      } else {
        this.dealerScoreColor.push({
          name:this.dealerScore[i].name,
          value:'#77F186'
        })
      }
    }
  }
  
  setFilter():void{
    this.search = {
      fromDate:'',
      toDate:'',
      group:[]
    }
    // Validacion de las fechas
    if(this.fDate && this.tDate){
      if(((this.fDate.year && this.fDate.month) && this.fDate.day)&&(this.tDate.year&&this.tDate.month)&&this.tDate.day){
        // las fechas están bien
        if(this.fDate.month.toString().length == 1){
          this.fDate.month = '0'+this.fDate.month.toString()
        }
        if(this.fDate.day.toString().length == 1){
          this.fDate.day = '0'+this.fDate.day.toString()
        }
        if(this.tDate.month.toString().length == 1){
          this.tDate.month = '0'+this.tDate.month.toString()
        }
        if(this.tDate.day.toString().length == 1){
          this.tDate.day = '0'+this.tDate.day.toString()
        }
        this.search.fromDate = this.fDate.year.toString() + this.fDate.month.toString() + this.fDate.day.toString()
        this.search.toDate = this.tDate.year.toString() + this.tDate.month.toString() + this.tDate.day.toString()
        if(this.dealerSelect == "all"){
          for(let i=0;i<this.dealerByGroup.length;i++){
            for(let x=0;x<this.dealerByGroup[i].cl.length; x++){
              this.search.group.push(
                this.dealerByGroup[i].cl[x].cl
              )
            }
          }
          
        } else {
          for(let d=0;d<this.dealerByGroup.length; d++){
            if(this.dealerByGroup[d].group == this.dealerSelect){
              for(let c=0;c<this.dealerByGroup[d].cl.length;c++){
                this.search.group.push(
                  this.dealerByGroup[d].cl[c].cl
                )
              }
            }
          }
        }
        this.getKascGeneral()
        this.getKasc()
        this.getKasclast()
        this.getindicatorSat()
        this.getDcsiByDate()
        this.getTicketByDate()
        this.getKacsResult()
        this.getKacsResultTrimonth()
        this.getLoyaltyByDealer()
        this.getKascDetails()
        this.getRevisitDetails()
        this.getRecommendDetails()
        this.getFrftByDealer()
        this.getFrftOffenders()
        this.getFrftbyPer()
      } else {
        window.alert('Por favor revisa las fechas')
      }
    } else {
      window.alert('Por favor completa el campo de fechas')
    }
  }
  setColorScheme(data:any): void{
    let kasc = data
    if(kasc){
      for(let k=0; k<kasc.length; k++){
        this.customColor.push({
          name:kasc[k].name,
          value:kasc[k].color
        })
      }
    }
  }
  yRightAxisScale(min, max){
    return {min: `${min}`, max:`${max}`}
  }
  setColorSchemeLoyalty(d:any){
    let data = d.series
    for(let i=0;i<data.length;i++){
      if(data[i].value > 43.9){
        this.loyaltyColor.push({
          name:data[i].name,
          value:"#77F186"
        })
      } else if(data[i].value < 44 && data[i].value > 40){
        this.loyaltyColor.push({
          name:data[i].name,
          value:"#F9EA2B"
        })
      } else {
        this.loyaltyColor.push({
          name:data[i].name,
          value:"#FA98AD"
        })
      }
    }
  }

  getTotal():void{
    this.contacto = []
    if((this.ticketByDate.length>0)&&(this.dcsiByDate.length>0)){
      
      for(let i=0; i<this.dcsiByDate.length;i++){
        this.contacto.push({
          periodo:this.dcsiByDate[i].periodo,
          value:0
        })
        for(let j=0;j<this.ticketByDate.length;j++){
          if(this.dcsiByDate[i].periodo == this.ticketByDate[j].periodo){
            this.contacto[i].value = (this.dcsiByDate[i].total / this.ticketByDate[j].total) * 100
          }
        }
      }
    }
  }
}
