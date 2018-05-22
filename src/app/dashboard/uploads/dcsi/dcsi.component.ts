import { Component, OnInit } from '@angular/core';
import { AOA2SheetOpts, SheetAOAOpts, XLSX$Utils } from 'xlsx';
import { CrmsurveysService } from '../../../services/crmsurveys.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-dcsi',
  templateUrl: './dcsi.component.html',
  styleUrls: ['./dcsi.component.css']
})
export class DcsiComponent implements OnInit {
  test:any=[]
  progress = 0
  data:any;
  dataUpLoad:any=[]
  err:any=[]
  msg:any = []
  progressTwo:number = 0
  seeDetails:boolean=false;
  constructor( private crmService:CrmsurveysService) { }

  ngOnInit() {
  }

  onFileChange(evt: any): void {
    this.data = []
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
      this.dataValidate(this.data)

    };
    reader.readAsBinaryString(target.files[0]);
    
  }

  dataValidate(data:any){
    this.dataUpLoad = []
    this.err = []
    
    for(let i=0; i<1000;i++){
      this.dataUpLoad.push({
        lead_id: data[i][0],
        type:data[i][1],
        date:data[i][2],
        cod_country: data[i][3],
        cod_dealer: data[i][4],
        id_interviewer: data[i][5],
        id_customer:data[i][6],
        vin: data[i][7],
        cod_category: data[i][8],
        cod_dcsi: data[i][9],
        answer:data[i][10],
        answerOpen:data[i][11]
      })
    }
  }

  saveData():void{
    this.msg = []
    for(let i=0;i<this.dataUpLoad.length;i++){
      this.crmService.saveDCSI(this.dataUpLoad[i])
      .subscribe( err =>{let save = JSON.parse(err);this.test = JSON.parse(err); this.progressTwo += parseInt(save.save); this.msg.push({msg:save.msg, reg:save.reg})})
    }
  }

}
