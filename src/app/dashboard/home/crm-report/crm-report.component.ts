import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { CrmsurveysService } from '../../../services/crmsurveys.service';
import { DealerService } from '../../../services/dealer.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Chart, ChartConfiguration, ChartElementsOptions, ChartDataSets, ChartData } from 'chart.js';
import 'chartjs-plugin-datalabels';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-crm-report',
  templateUrl: './crm-report.component.html',
  styleUrls: ['./crm-report.component.css']
})
export class CrmReportComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user'));
  // Filtros
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
  dealerSelect:any = 'all'
  dealerByGroup:any= []
  search:any = {
    fromDate:'',
    toDate:'',
    periodos:'',
    group:[]
  }
  periodos:number=4
  // Fin Filtros
  //Objetos de datos
  kacsGeneral:any=[]
  kacsGeneralTri:any=[]
  kacsPerDate:any=[]
  frftPerDate:any=[]
  loyaltyPerDate:any=[]
  loyaltyPerDateTri:any=[]
  kacsResult:any=[]
  kacsResultTriMonth:any=[]
  loyaltyPerDealer:any=[]
  kacsDetails:any=[]
  revisitDetails:any=[]
  recomDetails:any=[]
  frftPerDealer:any=[]
  //Objetos Gráficos
  kacsGeneralChart:any;
  kacsGeneralTriChart:any;
  satisfactionIndChart:any;
  kacsResultChart:any;
  loyaltyPerDealerChart:any;
  kacsStacked:any;
  visitStacked:any;
  recoStacked:any;
  loyaltyStacked:any;
  frftPerDealerChart:any;
  f:any;
  i:any;
  //Charts Options
  optChart:any = {
    scaleShowValues:false,
    plugins: {
      datalabels: {
        color: 'black',
        display: true,
        font: {
          weight: 'bold'
        },
        anchor:'end',
        align:'end'
      }
    },
    scales: {
      xAxes: [{
        ticks:{
          autoSkip:false,
          maxRotation:90,
          minRotation:90
        },
        gridLines: {
          display:false
        }
      }],
      yAxes: [{
        gridLines: {
          display:false
        }
      }]
    },
    ticks:{
      autoSkip:false
    }
  }
  //Menssages
  modalMSG:any;
  closeResult:string;
  messages = {title:'', msg:''}
  constructor( private modalService:NgbModal, private dealerService:DealerService, private crmServ:CrmsurveysService) { }

  @ViewChild('itemUno') One:ElementRef
  @ViewChild('itemDos') Two:ElementRef
  @ViewChild('itemTres') Three:ElementRef
  @ViewChild('itemCuatro') Four:ElementRef
  @ViewChild('itemCinco') Five:ElementRef
  @ViewChild('msg') MSG:ElementRef
  @ViewChild('itemSeis') Six:ElementRef
  @ViewChild('itemSiete') Seven:ElementRef
  @ViewChild('itemOcho') Eight:ElementRef
  @ViewChild('itemNueve') Nine:ElementRef
  @ViewChild('itemDiez') Ten:ElementRef
  @ViewChild('itemOnce') Eleven:ElementRef
  @ViewChild('itemDoce') Twelve:ElementRef
  @ViewChild('itemTrece') Thirteen:ElementRef
  @ViewChild('itemCatorce') Fourteen:ElementRef
  @ViewChild('itemQuince') Fifteen:ElementRef

  ngOnInit() {
    this.getDealerByGroup()
  }
  getDealerByGroup():void{
    this.dealerService.getDealerByGroup()
    .subscribe( dealerByGroup => {
      this.dealerByGroup = dealerByGroup,
      this.setFilter()
    } )
  }
  /*
  /* Services
  */
  getKacsGeneral():void{
    this.kacsGeneral = []
    this.crmServ.kacsGeneral(this.search)
    .subscribe( kacs => {
      this.kacsGeneral = JSON.parse(kacs);this.kacs();
      this.getKacsGeneralTri()
    })
  }
  getKacsGeneralTri():void{
    this.kacsGeneralTri = []
    let search = this.search
    for(let i=0; i<3; i++){
      search.fromDate = moment(this.search.fromDate).subtract(1,'month').format('YYYYMMDD')
      search.toDate = moment(search.fromDate).add(1,'month').subtract(1,'days').format('YYYYMMDD')
      this.kacsGeneralTri.push({
        periodo: moment(search.fromDate).format('YYYYMM'),
        desde: search.fromDate,
        hasta: search.toDate,
        data:[]
      })
      this.loyaltyPerDateTri.push({
        periodo: moment(search.fromDate).format('YYYYMM'),
        desde: search.fromDate,
        hasta: search.toDate,
        data:[]
      })
      this.crmServ.kacsGeneral(search)
      .subscribe( kacs =>{
        this.kacsGeneralTri[i].data = JSON.parse(kacs);
        this.kacsTriOne(this.kacsGeneralTri[0].data);
        this.kacsTriTwo(this.kacsGeneralTri[1].data);
        this.kacsTriThree(this.kacsGeneralTri[2].data)
      })

      this.crmServ.getLoyaltyPerDealer(search)
      .subscribe( loyalty=>{
        this.loyaltyPerDateTri[i].data = JSON.parse(loyalty);
        this.loyaltyTriChartOne(this.loyaltyPerDateTri[0].data)
        this.loyaltyTriChartTwo(this.loyaltyPerDateTri[1].data)
        this.loyaltyTriChartTri(this.loyaltyPerDateTri[2].data)
      } )
    }
  }

  getSatisfactionServices():void{
    this.getSatisfactionIndKacs()
    this.getSatisfactionIndFRFT()
    this.getSatisfactionIndLoyalty()
  }
  getSatisfactionIndKacs():void{
    this.kacsPerDate = []
    this.crmServ.satisfactionIndKacs(this.search)
    .subscribe( kacs =>{
      this.kacsPerDate = JSON.parse(kacs);
      // this.getSatisfactionIndFRFT()
      
    })
  }
  getSatisfactionIndFRFT():void{
    this.frftPerDate = []
    this.crmServ.satisfactionIndFRFT(this.search)
    .subscribe( frft =>{
      this.frftPerDate = JSON.parse(frft);
      // this.getSatisfactionIndLoyalty()
      
      
    })
  }
  getSatisfactionIndLoyalty():void{
    this.loyaltyPerDate = []
    this.crmServ.satisfactionIndLoyalty(this.search)
    .subscribe( loyalty =>{
      this.loyaltyPerDate = JSON.parse(loyalty);
      // this.satisfactionInd()
      this.loyaltyStackedChart()
    })
  }
  getKacsResult():void{
    this.kacsResult = []
    this.crmServ.getKacsResultALT(this.search)
    .subscribe( result =>{
      this.kacsResult = JSON.parse(result)
      
    })
  }
  getKacsResultTriMonth():void{
    this.kacsResultTriMonth = []
    this.crmServ.getKacsResultTrimonthALT(this.search)
    .subscribe( resultTri =>{
      this.kacsResultTriMonth = JSON.parse(resultTri),
      this.kacsResultChartGen()

    } )
  }
  getLoyaltyPerDealer():void{
    this.loyaltyPerDealer = []
    this.crmServ.getLoyaltyPerDealer(this.search)
    .subscribe( loyalty =>{
      this.loyaltyPerDealer = JSON.parse(loyalty),
      this.loyaltyChart()
    })
  }
  getKascDetails():void{
    this.kacsDetails = []
    this.crmServ.getKascDetailsALT(this.search)
    .subscribe( kacs =>{
      this.kacsDetails = JSON.parse(kacs);
      this.kacsStackedChart()
    } )
  }
  getRevisitDetails():void{
    this.revisitDetails = []
    this.crmServ.getRevisitDetailsALT(this.search)
    .subscribe( visit =>{
      this.revisitDetails = JSON.parse(visit)
      this.visitStackedChart()

    })
  }
  getRecommendDetails():void{
    this.recomDetails = []
    this.crmServ.getRecommendDetailsALT(this.search)
    .subscribe( reco =>{
      this.recomDetails = JSON.parse(reco);
      this.recoStackedChart()
    })
  }
  getFrftByDealer():void{
    this.frftPerDealer = []
    this.crmServ.getFrftByDealerALT(this.search)
    .subscribe( frft => {
      this.frftPerDealer = JSON.parse(frft)
      this.frftPerDealerChartGen()
    } )
  }

  /*
  /* Charts
  */
 
  
  //Chart 1 Satisfaction Indicators: KACS, LOYALTY, FRFT
  satisfactionInd():void{
    if(this.satisfactionIndChart){
      this.satisfactionIndChart.data.labels = this.kacsPerDate.labels
      this.satisfactionIndChart.data.datasets[0].data = this.loyaltyPerDate.values
      this.satisfactionIndChart.data.datasets[1].data = this.frftPerDate.values
      this.satisfactionIndChart.data.datasets[2].data = this.kacsPerDate.values
      this.satisfactionIndChart.update()
    } else {
      this.satisfactionIndChart = new Chart( this.Five.nativeElement,{
        type:'bar',
        data:{
          labels: this.kacsPerDate.labels,
          datasets:[
            {
              type:'line',
              label:'% LEALTAD',
              data: this.loyaltyPerDate.values,
              fill:false,
              backgroundColor:'rgb(250,152,173)',
              borderColor:'rgb(250,152,173)',
  
            },
            {
              type:'line',
              label:'% FRFT',
              data: this.frftPerDate.values,
              fill:false,
              backgroundColor:'rgb(119,134,241)',
              borderColor:'rgb(119,134,241)',
  
            },
            {
              type:'bar',
              label: '% KACS',
              data: this.kacsPerDate.values,
              backgroundColor: 'rgba(196, 198, 200, 0.5)',
              borderWidth: 0
            }
            
          ]
        },
        options:this.optChart
      })
    }
    
  }
  kacsResultChartGen():void{
    if(this.kacsResultChart){
      this.kacsResultChart.destroy()
    }
    this.kacsResultChart = new Chart( this.Six.nativeElement,{
      type:'line',
      data:{
        labels: this.kacsResult.labels,
        datasets:[
          {
            type:'line',
            label:'Periodo',
            fill:false,
            data:this.kacsResult.values,
            backgroundColor:'rgb(119,134,241)',
            borderColor:'rgb(119,134,241)',
            datalabels:{
              display:true,
              color: 'rgb(119,134,241)',
              align:'top',
              anchor:'top'

            }
            
          },
          {
            type:'line',
            label:'Trimestre Anterior',
            fill:false,
            data:this.kacsResultTriMonth.values,
            backgroundColor:'rgb(241,134,119)',
            borderColor:'rgb(241,134,119)',
            datalabels:{
              display:true,
              color: 'rgb(241,134,119)',
              align:'bottom',
              anchor:'start'

            },
            
          }
        ]
      },
      options:this.optChart
    })
    
  }
  loyaltyChart():void{
    let avg = [];
    let add = 0;
    for(let i of this.loyaltyPerDealer.values){
      add += parseInt(i)
    }
    for(let i of this.loyaltyPerDealer.values){
      avg.push(
        add / this.loyaltyPerDealer.values.length
      )
    }
    if(this.loyaltyPerDealerChart){
      this.loyaltyPerDealerChart.data.labels = this.loyaltyPerDealer.labels
      this.loyaltyPerDealerChart.data.datasets[0].data = avg
      this.loyaltyPerDealerChart.data.datasets[1].data = this.loyaltyPerDealer.values
      this.loyaltyPerDealerChart.data.datasets[1].backgroundColor = this.loyaltyPerDealer.color
      
      this.loyaltyPerDealerChart.update()
    } else {
      this.loyaltyPerDealerChart = new Chart(this.Seven.nativeElement,{
        type:'bar',
        data:{
          labels:this.loyaltyPerDealer.labels,
          datasets:[
            {
              type:'line',
              label: 'PROMEDIO',
              fill:false,
              backgroundColor:'rgb(119,134,241)',
              borderColor:'rgb(119,134,241)',
              data: avg,
              datalabels:{ display: false}
            },
            {
              type:'bar',
              label: '% LEALTAD',
              data: this.loyaltyPerDealer.values,
              backgroundColor: this.loyaltyPerDealer.color,
              borderWidth: 0
            }
          ]
          
        },
        options:this.optChart
      })
    }
    
  }
  loyaltyTriChartOne(data):void{
    let item = []
    let c = this.Eight.nativeElement
    let ctx = c.getContext('2d')
    ctx.canvas.width = window.innerWidth
    let obj = ctx.canvas.width/this.kacsGeneral.labels.length
    ctx.canvas.height = 100;

    if(data.labels){
      for(let i=0; i<this.loyaltyPerDealer.labels.length; i++){
        for(let j=0; j<data.labels.length; j++){
          if(this.kacsGeneral.labels[i] == data.labels[j]){
            item.push({
              x:(obj/7)*1+ obj*i,
              y:0,
              w:(obj/7)*5,
              h:(obj/7)*20,
              fill:data.color[j]
            })
          }
        }
      }
    }
    for(let i of item){
      ctx.fillStyle = i.fill
      ctx.fillRect(i.x, i.y, i.w, i.h)
    }
  }
  loyaltyTriChartTwo(data):void{
    let item = []
    let c = this.Nine.nativeElement
    let ctx = c.getContext('2d')
    ctx.canvas.width = window.innerWidth
    let obj = ctx.canvas.width/this.kacsGeneral.labels.length
    ctx.canvas.height = 100;

    if(data.labels){
      for(let i=0; i<this.loyaltyPerDealer.labels.length; i++){
        for(let j=0; j<data.labels.length; j++){
          if(this.kacsGeneral.labels[i] == data.labels[j]){
            item.push({
              x:(obj/7)*1+ obj*i,
              y:0,
              w:(obj/7)*5,
              h:(obj/7)*20,
              fill:data.color[j]
            })
          }
        }
      }
    }
    for(let i of item){
      ctx.fillStyle = i.fill
      ctx.fillRect(i.x, i.y, i.w, i.h)
    }
  }
  loyaltyTriChartTri(data):void{
    let item = []
    let c = this.Ten.nativeElement
    let ctx = c.getContext('2d')
    ctx.canvas.width = window.innerWidth
    let obj = ctx.canvas.width/this.kacsGeneral.labels.length
    ctx.canvas.height = 100;

    if(data.labels){
      for(let i=0; i<this.loyaltyPerDealer.labels.length; i++){
        for(let j=0; j<data.labels.length; j++){
          if(this.kacsGeneral.labels[i] == data.labels[j]){
            item.push({
              x:(obj/7)*1+ obj*i,
              y:0,
              w:(obj/7)*5,
              h:(obj/7)*20,
              fill:data.color[j]
            })
          }
        }
      }
    }
    for(let i of item){
      ctx.fillStyle = i.fill
      ctx.fillRect(i.x, i.y, i.w, i.h)
    }
  }
  //Chart 2 Kacs per Dealer and 3 last month
  kacs(): void{
    let avg = [];
    let add = 0;
    for(let i of this.kacsGeneral.values){
      add += parseInt(i)
    }
    for(let i of this.kacsGeneral.values){
      avg.push(
        add / this.kacsGeneral.values.length
      )
    }
    if(this.kacsGeneralChart){
      this.kacsGeneralChart.destroy()
    }
    this.kacsGeneralChart = new Chart( this.One.nativeElement, {
      type: 'bar',
      data: {
          labels: this.kacsGeneral.labels,
          datasets: [
          {
            type:'line',
            label: 'PROMEDIO',
            fill:false,
            backgroundColor:'rgb(119,134,241)',
            borderColor:'rgb(119,134,241)',
            data: avg,
            datalabels:{ display: false}
          },
          {
            type:'bar',
            label: '% KACS',
            data: this.kacsGeneral.values,
            backgroundColor: this.kacsGeneral.color,
            borderWidth: 0
          }],
      },
      options: this.optChart
      
    })
    // if(this.kacsGeneralChart){
    //   this.kacsGeneralChart.data.labels = this.kacsGeneral.labels;
    //   this.kacsGeneralChart.data.datasets[0].data = avg;
    //   this.kacsGeneralChart.data.datasets[1].data = this.kacsGeneral.values;
    //   this.kacsGeneralChart.data.datasets[1].backgroundColor = this.kacsGeneral.color;
    //   this.kacsGeneralChart.update();
    // } else {
    //   this.kacsGeneralChart = new Chart( this.One.nativeElement, {
    //     type: 'bar',
    //     data: {
    //         labels: this.kacsGeneral.labels,
    //         datasets: [
    //         {
    //           type:'line',
    //           label: 'PROMEDIO',
    //           fill:false,
    //           backgroundColor:'rgb(119,134,241)',
    //           borderColor:'rgb(119,134,241)',
    //           data: avg,
    //           datalabels:{ display: false}
    //         },
    //         {
    //           type:'bar',
    //           label: '% KACS',
    //           data: this.kacsGeneral.values,
    //           backgroundColor: this.kacsGeneral.color,
    //           borderWidth: 0
    //         }],
    //     },
    //     options: this.optChart
        
    //   })
    // }
  }
  kacsTriOne(data):void{
    let item = []
    let c = this.Two.nativeElement
    let ctx = c.getContext('2d')
    ctx.canvas.width = window.innerWidth
    let obj = ctx.canvas.width/this.kacsGeneral.labels.length
    ctx.canvas.height = 100;

    if(data.labels){
      for(let i=0; i<this.kacsGeneral.labels.length; i++){
        for(let j=0; j<data.labels.length; j++){
          if(this.kacsGeneral.labels[i] == data.labels[j]){
            item.push({
              x:(obj/7)*1+ obj*i,
              y:0,
              w:(obj/7)*5,
              h:(obj/7)*20,
              fill:data.color[j]
            })
          }
        }
      }
    }
    for(let i of item){
      ctx.fillStyle = i.fill
      ctx.fillRect(i.x, i.y, i.w, i.h)
    }
  }
  kacsTriTwo(data):void{
    let item = []
    let d = this.Three.nativeElement
    let dCtx = d.getContext('2d')
    dCtx.canvas.width = window.innerWidth
    let obj = dCtx.canvas.width/this.kacsGeneral.labels.length
    dCtx.canvas.height = 100;

    if(data.labels){
      for(let i=0; i<this.kacsGeneral.labels.length; i++){
        for(let j=0; j<data.labels.length; j++){
          if(this.kacsGeneral.labels[i] == data.labels[j]){
            item.push({
              x:(obj/7)*1+ obj*i,
              y:0,
              w:(obj/7)*5,
              h:(obj/7)*20,
              fill:data.color[j]
            })
          }
        }
      }
    }
    for(let i of item){
      dCtx.fillStyle = i.fill
      dCtx.fillRect(i.x, i.y, i.w, i.h)
    }
  }
  kacsTriThree(data):void{
    let item = []
    let d = this.Four.nativeElement
    let dCtx = d.getContext('2d')
    dCtx.canvas.width = window.innerWidth
    let obj = dCtx.canvas.width/this.kacsGeneral.labels.length
    dCtx.canvas.height = 100;

    if(data.labels){
      for(let i=0; i<this.kacsGeneral.labels.length; i++){
        for(let j=0; j<data.labels.length; j++){
          if(this.kacsGeneral.labels[i] == data.labels[j]){
            item.push({
              x:(obj/7)*1+ obj*i,
              y:0,
              w:(obj/7)*5,
              h:(obj/7)*20,
              fill:data.color[j]
            })
          }
        }
      }
    }
    for(let i of item){
      dCtx.fillStyle = i.fill
      dCtx.fillRect(i.x, i.y, i.w, i.h)
    }
  }
  // Stacked Chats
  kacsStackedChart():void{
    if(this.kacsStacked){
      this.kacsStacked.data.labels = this.kacsDetails.labels
      this.kacsStacked.data.datasets[0].data = this.kacsDetails.insatisfechos
      this.kacsStacked.data.datasets[1].data = this.kacsDetails.neutral
      this.kacsStacked.data.datasets[2].data = this.kacsDetails.satisfechos
      this.kacsStacked.update()
    } else {
      this.kacsStacked = new Chart(this.Eleven.nativeElement, {
        type:'bar',
        data:{
          labels:this.kacsDetails.labels,
          datasets:[
            
            {
              label:'Insatisfecho',
              backgroundColor:'rgba(250,152,173)',
              data:this.kacsDetails.insatisfechos
            },
            {
              label:'Neutral',
              backgroundColor:'rgba(249,234,43)',
              data:this.kacsDetails.neutral
            },
            {
              label:'Satisfechos',
              backgroundColor:'rgba(119,241,134)',
              data:this.kacsDetails.satisfechos
            },
          ]
        },
        options:{
          tooltips:{
            mode:'index',
            intersect:false
          },
          responsive:true,
          scales:{
            xAxes:[{
              stacked:true,
              gridLines: {
                display:false
              }
            }],
            yAxes:[{
              stacked:true,
              gridLines: {
                display:false
              },
              ticks:{
                max:100
              }
            }]
          }
        }
      })
    }
    
  }
  visitStackedChart():void{
    if(this.visitStacked){
      this.visitStacked.data.labels = this.revisitDetails.labels
      this.visitStacked.data.datasets[0].data = this.revisitDetails.novisit
      this.visitStacked.data.datasets[1].data = this.revisitDetails.neutral
      this.visitStacked.data.datasets[2].data = this.revisitDetails.visit
      this.visitStacked.update()
    } else {
      this.visitStacked = new Chart(this.Twelve.nativeElement, {
        type:'bar',
        data:{
          labels:this.revisitDetails.labels,
          datasets:[
            {
              label:'No Visitará',
              backgroundColor:'rgba(250,152,173)',
              data:this.revisitDetails.novisit
            },
            {
              label:'Neutral',
              backgroundColor:'rgba(249,234,43)',
              data:this.revisitDetails.neutral
            },
            {
              label:'Visitará',
              backgroundColor:'rgba(119,241,134)',
              data:this.revisitDetails.visit
            },
          ]
        },
        options:{
          tooltips:{
            mode:'index',
            intersect:false
          },
          responsive:true,
          scales:{
            xAxes:[{
              stacked:true,
              gridLines: {
                display:false
              }
            }],
            yAxes:[{
              stacked:true,
              gridLines: {
                display:false
              },
              ticks:{
                max:100
              }
            }]
          }
        }
      })
    }
    
  }
  recoStackedChart():void{
    if(this.recoStacked){
      this.recoStacked.data.labels = this.recomDetails.labels
      this.recoStacked.data.datasets[0].data = this.recomDetails.noreco
      this.recoStacked.data.datasets[1].data = this.recomDetails.neutral
      this.recoStacked.data.datasets[2].data = this.recomDetails.reco
      this.recoStacked.update()
      
    } else {
      this.recoStacked = new Chart( this.Thirteen.nativeElement,{
        type:'bar',
        data:{
          labels: this.recomDetails.labels,
          datasets:[
            {
              label:'No Recomendará',
              backgroundColor:'rgba(250,152,173)',
              data:this.recomDetails.noreco
            },
            {
              label:'Neutral',
              backgroundColor:'rgba(249,234,43)',
              data:this.recomDetails.neutral
            },
            {
              label:'Recomendaría',
              backgroundColor:'rgba(119,241,134)',
              data:this.recomDetails.reco
            },
          ]
        },
        options:{
          tooltips:{
            mode:'index',
            intersect:false
          },
          responsive:true,
          scales:{
            xAxes:[{
              stacked:true
            }],
            yAxes:[{
              stacked:true
            }]
          }
        }
      })
    }
  }
  loyaltyStackedChart():void{
    if(this.loyaltyStacked){
      this.loyaltyStacked.destroy()
      // this.loyaltyStacked.data = this.loyaltyPerDate.labels
      // this.loyaltyStacked.data.datasets[0].data = this.loyaltyPerDate.values
      // this.loyaltyStacked.update()
    } 
    // else {
      
    // }
    this.loyaltyStacked = new Chart( this.Fourteen.nativeElement,{
      type:'bar',
      data:{
        labels:this.loyaltyPerDate.labels,
        datasets:[
          {
            label:'Lealtad',
            backgroundColor:'rgba(119,241,134)',
            data:this.loyaltyPerDate.values
          }
        ]
      },
      options:{
        tooltips:{
          mode:'index',
          intersect:false
        },
        plugins:{
          datalabels:{
            color: 'black',
            display: true,
            font: {
              weight: 'bold'
            },
            anchor:'end',
            align:'end'
          }
        },
        responsive:true,
        scales:{
          xAxes:[{
            stacked:false,
            gridLines: {
              display:false
            }
          }],
          yAxes:[{
            stacked:false,
            gridLines: {
              display:false
            }
          }]
        }
      }
    })
    
    
  }
  frftPerDealerChartGen():void{
    let avg = [];
    let add = 0;
    for(let i of this.frftPerDealer.values){
      add += parseInt(i)
    }
    for(let i of this.frftPerDealer.values){
      avg.push(
        add / this.frftPerDealer.values.length
      )
    }
    if(this.frftPerDealerChart){
      this.frftPerDealerChart.data.labels = this.frftPerDealer.labels
      this.frftPerDealerChart.data.datasets[0].data = avg
      this.frftPerDealerChart.data.datasets[1].data = this.frftPerDealer.values
      this.frftPerDealerChart.data.datasets[1].backgroundColor = this.frftPerDealer.color
      this.frftPerDealerChart.update()
    } else {
      this.frftPerDealerChart = new Chart( this.Fifteen.nativeElement,{
        type:'bar',
        data:{
          labels:this.frftPerDealer.labels,
          datasets:[
            {
              type:'line',
              label: 'PROMEDIO',
              fill:false,
              backgroundColor:'rgb(119,134,241)',
              borderColor:'rgb(119,134,241)',
              data: avg,
              datalabels:{ display: false}
            },
            {
                label:'FRFT',
                backgroundColor:this.frftPerDealer.color,
                data:this.frftPerDealer.values
            }
          ]
        },
        options:this.optChart
      })
    }
    
  }

  /*
  /* Set Filter and exe Services
  */
  setFilter():void{
    this.search = {
      fromDate:'',
      toDate:'',
      periodos:'',
      group:[]
    }
    if(this.periodos){
      this.search.periodos = this.periodos
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
          if(this.search.fromDate > this.search.toDate){
            this.messages.title = 'Fecha Inválida'
            this.messages.msg = `La fecha: ${this.search.fromDate} no puede considerarse menor que ${this.search.toDate}, por ello debe cambiar el rango de las fechas e intentarlo nuevamente`
            return this.messagge(this.MSG)
          }
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
          // After review Filter Calls Services
          
          // this.getSatisfactionIndKacs()
          // this.getSatisfactionIndFRFT()
          // this.getSatisfactionIndLoyalty()
          this.getSatisfactionServices()
          this.getKacsGeneral()
          
          this.getKacsResult()
          this.getKacsResultTriMonth()
          this.getLoyaltyPerDealer()
          this.getKascDetails()
          this.getRevisitDetails()
          this.getRecommendDetails()
          this.getFrftByDealer()
          //Test
          
          
          
          
        } else {
          this.messages.title = 'Fecha Inválida'
          this.messages.msg = `Por favor revisa las fechas, recuerda que el formato debe ser: Año-Mes-Dia`
          return this.messagge(this.MSG)
        }
      } else {
        this.messages.title = 'Fecha Inválida'
          this.messages.msg = `No sabemos que información debemos traerte si no completas las fechas`
          return this.messagge(this.MSG)
      }
    } else {
      this.messages.title = 'Numero de Periodos'
      this.messages.msg = `En realidad no sabemos como pasó esto, pero el numero de periodos es inválido`
      return this.messagge(this.MSG)  
    }
    
  }

  messagge(msg): void {
    // this.userToDelet = user
    this.modalMSG = this.modalService.open(msg, {
      centered:true
    })
    this.modalMSG.result.then((result)=>{
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
