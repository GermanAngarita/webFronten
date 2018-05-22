import { Component, OnInit } from '@angular/core';
import { DatePipe} from '@angular/common';
import { TicketService } from '../services/ticket.service';
import { AOA2SheetOpts, SheetAOAOpts, XLSX$Utils } from 'xlsx';
import * as XLSX from 'xlsx';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-load-maintenance',
  templateUrl: './load-maintenance.component.html',
  styleUrls: ['./load-maintenance.component.css']
})
export class LoadMaintenanceComponent implements OnInit {
  masInfo:boolean;
  verTabla:boolean;
  tabla:any= [
    {
      codigo:'case',
      item:'colision aseguradora',
      desc:'entradas a colisión, lámina y/o pintura facturadas a aseguradora'
    },
    {
      codigo:'ccli',
      item:'colision cliente',
      desc:'entradas a colisión, lámina y/o pintura facturadas a cliente'
    },
    {
      codigo:'rcom',
      item:'reparación compleja',
      desc:'reparaciónes correctivas de alta complejidad: motor, transmisión etc.'
    },
    {
      codigo:'rsen',
      item:'reparaciones sencillas',
      desc:'reparaciones de baja complejidad: cambios de aceite, cambio de plumillas, pastillas etc'
    },
    {
      codigo:'acci',
      item:'accesorios + instalación',
      desc:'instalación o venta de accesorios'
    },
    {
      codigo:'reto',
      item:'retorno',
      desc:'toda clase de retorno: reparación o mantenimiento'
    },
    {
      codigo:'intr',
      item:'interna',
      desc:'Alistamiento, vitrina, trabajos internos'
    },
    {
      codigo:'gtia',
      item:'garantia',
      desc:'ingresos solo por garantia'
    },
  ]
  progress: number = 0;
  data: any;
  dataToUpload: any=[];
  error: any = []
  progressTwo:number = 0
  public user:any = JSON.parse(localStorage.getItem('user'))
  msg:any = [];
  total:any=[]
  page:any=0;
  collectionSize:any=0
  constructor( private ticketService:TicketService) { }

  ngOnInit() {
    this.llenarTabla()
  }
  llenarTabla(){
    for(let i=0; i<31;i++){
      if(i==0){
        this.tabla.push({
          codigo:'mto_'+1,
          item:'mantenimiento '+1+'.000 KMS',
          desc:'Entrada a mantenimiento de '+1+'.000'+' kms'
        })
      } else {
        this.tabla.push({
          codigo:'mto_'+i*5,
          item:'mantenimiento '+i*5+'.000 KMS',
          desc:'Entrada a mantenimiento de '+i*5+'.000'+' kms'
        })
      }
    }
  }

  onFileChange(evt: any): void {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if(target.files.length !== 1 ) throw new Error ('No cargue multiples archivos');
    this.progress = 0;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      
      this.progress = 25;
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      this.progress = 50;
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.progress = 75;
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.progress = 90;
      this.progress = 100;
      this.progressTwo = 0;
      // this.dataValidate(this.data)

    };
    reader.readAsBinaryString(target.files[0]);
  }
  dataValidate(data: any){
    this.dataToUpload = [];
    this.error = [];
    this.msg = [];
    for(let i=0;i<data.length;i++){
      if(data[i][0] && data[i][1] && data[i][2] && data[i][3] && data[i][4] && data[i][5] && data[i][6] ){
        if(data[i][2].length === 17){
          if(data[i][3].length === 6){
            let valType = false
            for(let x=0; x<this.tabla.length; x++){
              if(this.tabla[x].codigo.toUpperCase() === data[i][5].toString()){
                valType = true
                if(data[i][6].length==5){
                  this.dataToUpload.push({
                    id_user: this.user._id,
                    bill_date: moment(data[i][0], 'DD-MM-YYYY'),
                    bill_number: data[i][1],
                    vin:data[i][2],
                    plate: data[i][3],
                    kilometers:parseInt(data[i][4]),
                    typeIn:data[i][5].toString(),
                    dealer_cod:data[i][6],
                    check: true
                  })
                } else {
                    this.error.push({
                      index:i,
                      date: moment().format('DD-MMMM-YYYY, h:mm:ss'),
                      msg:'No se reconoce el CL: '+data[i][6]
                    })
                  
                }
              }
            }
            if( !valType){
              this.error.push({
                index:i,
                date: moment().format('DD-MMMM-YYYY, h:mm:ss'),
                msg:'El tipo de entrada: '+data[i][5]+' no se reconoce'
              })
            }
          } else {
            console.log('la placa '+data[i][3]+'tiene: '+data[i][3].length+' caracteres')
            this.error.push({
              index:i,
              date: moment().format('DD-MMMM-YYYY, h:mm:ss'),
              msg:'La placa : '+data[i][3]+' tiene: '+data[i][3].length+' caracteres'
            })
          }
        } else {
          console.log('El vin '+data[i][2]+'tiene: '+data[i][2].length+' caracteres')
          this.error.push({
            index:i,
            date: moment().format('DD-MMMM-YYYY, h:mm:ss'),
            msg:'El vin: '+data[i][2]+' tiene: '+data[i][2].length+' caracteres'
          })
        }
      }
    }
    this.dateValidate()
    this.collectionSize = this.dataToUpload.length;
  }

  dateValidate(){
    for(let i=0; i<this.dataToUpload.length;i++){
      console.log(this.dataToUpload[i].bill_date._isValid)
      if(!this.dataToUpload[i].bill_date._isValid){
        this.dataToUpload[i].check = false
      }
    }
  }

  saveData(){
    this.msg = []
    for(let i=0; i<this.dataToUpload.length; i++){
      if(this.dataToUpload[i].check){
        this.ticketService.newTicket(this.dataToUpload[i])
        .subscribe( err => { let save = JSON.parse(err); this.progressTwo += parseInt(save.save); this.msg.push({msg:save.msg, reg:save.reg})})
      }
    }
  }



}
