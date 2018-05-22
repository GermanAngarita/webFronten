import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { CrmsurveysService } from '../../../services/crmsurveys.service';
import { DealerService } from '../../../services/dealer.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Chart, ChartConfiguration, ChartElementsOptions, ChartDataSets, ChartData } from 'chart.js';
import 'chartjs-plugin-datalabels';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-kacs-result-slide',
  templateUrl: './kacs-result-slide.component.html',
  styleUrls: ['./kacs-result-slide.component.css']
})
export class KacsResultSlideComponent implements OnInit {
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
  kacsResult:any=[]
  kacsResultTriMonth:any=[]

  //Graphics Object

  kacsResultChart:any;

  constructor( private modalService:NgbModal, private dealerService:DealerService, private crmServ:CrmsurveysService ) { }

  @ViewChild('msg') MSG:ElementRef
  @ViewChild('itemSeis') Six:ElementRef

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

  //Graphics Generate
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

  //Set filters
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
        this.getKacsResult()
        this.getKacsResultTriMonth()
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
