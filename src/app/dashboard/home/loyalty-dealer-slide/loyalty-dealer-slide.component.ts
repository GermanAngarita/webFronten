import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { CrmsurveysService } from '../../../services/crmsurveys.service';
import { DealerService } from '../../../services/dealer.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Chart, ChartConfiguration, ChartElementsOptions, ChartDataSets, ChartData } from 'chart.js';
import 'chartjs-plugin-datalabels';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-loyalty-dealer-slide',
  templateUrl: './loyalty-dealer-slide.component.html',
  styleUrls: ['./loyalty-dealer-slide.component.css']
})
export class LoyaltyDealerSlideComponent implements OnInit {
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
  search:any = {
    fromDate:'',
    toDate:'',
    periodos:'',
    group:[]
  }
  periodos:number=4
  dealerSelect:any = 'all'
  dealerByGroup:any= []

  //mensajes al usuario
  messages = {title:'', msg:''}
  // modalService:any;
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

  //Data Objects
  loyaltyPerDealer:any=[]
  loyaltyPerDateTri:any=[]

  //Graphic Objects
  loyaltyPerDealerChart:any

  constructor( private crmServ:CrmsurveysService, private dealerService:DealerService, private modalService:NgbModal ) { }

  @ViewChild('msg') MSG:ElementRef
  @ViewChild('itemSiete') Seven:ElementRef
  @ViewChild('itemOcho') Eight:ElementRef
  @ViewChild('itemNueve') Nine:ElementRef
  @ViewChild('itemDiez') Ten:ElementRef

  ngOnInit() {
    this.getDealerByGroup()
  }

  //Services
  getDealerByGroup():void{
    this.dealerService.getDealerByGroup()
    .subscribe( dealerByGroup => {
      this.dealerByGroup = dealerByGroup,
      this.setFilter()
    } )
  }

  getLoyaltyPerDealer():void{
    this.loyaltyPerDealer = []
    this.crmServ.getLoyaltyPerDealer(this.search)
    .subscribe( loyalty =>{
      this.loyaltyPerDealer = JSON.parse(loyalty),
      this.loyaltyChart(),
      this.getKacsGeneralTri()
    })
  }
  getKacsGeneralTri():void{
    // this.kacsGeneralTri = []
    let search = this.search
    for(let i=0; i<3; i++){
      search.fromDate = moment(this.search.fromDate).subtract(1,'month').format('YYYYMMDD')
      search.toDate = moment(search.fromDate).add(1,'month').subtract(1,'days').format('YYYYMMDD')
      // this.kacsGeneralTri.push({
      //   periodo: moment(search.fromDate).format('YYYYMM'),
      //   desde: search.fromDate,
      //   hasta: search.toDate,
      //   data:[]
      // })
      this.loyaltyPerDateTri.push({
        periodo: moment(search.fromDate).format('YYYYMM'),
        desde: search.fromDate,
        hasta: search.toDate,
        data:[]
      })
      // this.crmServ.kacsGeneral(search)
      // .subscribe( kacs =>{
      //   this.kacsGeneralTri[i].data = JSON.parse(kacs);
      //   this.kacsTriOne(this.kacsGeneralTri[0].data);
      //   this.kacsTriTwo(this.kacsGeneralTri[1].data);
      //   this.kacsTriThree(this.kacsGeneralTri[2].data)
      // })

      this.crmServ.getLoyaltyPerDealer(search)
      .subscribe( loyalty=>{
        this.loyaltyPerDateTri[i].data = JSON.parse(loyalty);
        this.loyaltyTriChartOne(this.loyaltyPerDateTri[0].data)
        this.loyaltyTriChartTwo(this.loyaltyPerDateTri[1].data)
        this.loyaltyTriChartTri(this.loyaltyPerDateTri[2].data)
      } )
    }
  }

  //Generate Charts
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
    let obj = ctx.canvas.width/this.loyaltyPerDealer.labels.length
    ctx.canvas.height = 100;

    if(data.labels){
      for(let i=0; i<this.loyaltyPerDealer.labels.length; i++){
        for(let j=0; j<data.labels.length; j++){
          if(this.loyaltyPerDealer.labels[i] == data.labels[j]){
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
    let obj = ctx.canvas.width/this.loyaltyPerDealer.labels.length
    ctx.canvas.height = 100;

    if(data.labels){
      for(let i=0; i<this.loyaltyPerDealer.labels.length; i++){
        for(let j=0; j<data.labels.length; j++){
          if(this.loyaltyPerDealer.labels[i] == data.labels[j]){
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
    let obj = ctx.canvas.width/this.loyaltyPerDealer.labels.length
    ctx.canvas.height = 100;

    if(data.labels){
      for(let i=0; i<this.loyaltyPerDealer.labels.length; i++){
        for(let j=0; j<data.labels.length; j++){
          if(this.loyaltyPerDealer.labels[i] == data.labels[j]){
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

  //Ser Filters
  setFilter():void{
    this.search = {
      fromDate:'',
      periodos:'',
      toDate:'',
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
        // this.getSatisfactionIndKacs()
        this.getLoyaltyPerDealer()
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
      centered:true,
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
