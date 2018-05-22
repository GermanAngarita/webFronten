import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { CrmsurveysService } from '../../../services/crmsurveys.service';
import { DealerService } from '../../../services/dealer.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Chart, ChartConfiguration, ChartElementsOptions, ChartDataSets, ChartData } from 'chart.js';
import 'chartjs-plugin-datalabels';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-crm-result-slide',
  templateUrl: './crm-result-slide.component.html',
  styleUrls: ['./crm-result-slide.component.css']
})
export class CrmResultSlideComponent implements OnInit {
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
  //Objetos de datos
  kacsDetails:any=[]
  revisitDetails:any=[]
  recomDetails:any=[]
  loyaltyPerDate:any=[]

  //Charts Object
  kacsStacked:any
  visitStacked:any
  recoStacked:any
  loyaltyStacked:any
  frftPerDealerChart:any

  constructor(private modalService:NgbModal, private dealerService:DealerService, private crmServ:CrmsurveysService) { }

  @ViewChild('msg') MSG:ElementRef
  @ViewChild('itemOnce') Eleven:ElementRef
  @ViewChild('itemDoce') Twelve:ElementRef
  @ViewChild('itemTrece') Thirteen:ElementRef
  @ViewChild('itemCatorce') Fourteen:ElementRef

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
  getSatisfactionIndLoyalty():void{
    this.loyaltyPerDate = []
    this.crmServ.satisfactionIndLoyalty(this.search)
    .subscribe( loyalty =>{
      this.loyaltyPerDate = JSON.parse(loyalty);
      // this.satisfactionInd()
      this.loyaltyStackedChart()
    })
  }


  //Generate Charts
  //Stacked Charts
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
        this.getKascDetails()
        this.getRecommendDetails()
        this.getSatisfactionIndLoyalty()
        this.getRevisitDetails()
        
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
