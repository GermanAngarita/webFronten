import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vin } from '../../class/vin';
import { VinsService } from '../../services/vins.service';
import { AOA2SheetOpts, SheetAOAOpts, XLSX$Utils } from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {
  
  
  constructor( private route: ActivatedRoute,
    private router: Router, private vinService: VinsService) { }
  
  ngOnInit() {
  }
  btnNext: boolean = false;
  data: any;
  progress: number;
  subprogress: number;
  progressSend: number = 0;
  vin: Vin[];
  spinner: boolean = false;
  message: string;
  status: string = 'load';
  totalData: number;
  public fieldControl = {
    emp_empresa: '',
    transaction: '',
    bill: '',
    department: '',
    location: '',
    ubication: '',
    bill_date: '',
    version: '',
    model: '',
    model_description: '',
    customer: '',
    subtotal: '',
    total: '',
    observations: '',
    version_description: '',
    vin: '',
    retail_in_date: '',
    retail_out_date: '',
    
    fab_ini_warranty: '',
    year: '',
    fab_end_warranty: '',
    
    dealer_cod: '',

    engine: '',
    color: '',
    sales_point: '',

    gao_type: '',
    gao_duration: '',
    days_slopes_warranty: '',

    use_type: '',
  };
  public nuevoVin = {
    emp_empresa: '',
    transaction: '',
    bill: '',
    department: '',
    location: '',
    ubication: '',
    bill_date: '',
    version: '',
    model: '',
    model_description: '',
    customer: '',
    subtotal: '',
    total: '',
    observations: '',
    version_description: '',
    vin: '',
    retail_in_date: '',
    retail_out_date: '',
    
    fab_ini_warranty: '',
    year: '',
    fab_end_warranty: '',
    
    dealer_cod: '',

    engine: '',
    color: '',
    sales_point: '',

    gao_type: '',
    gao_duration: '',
    days_slopes_warranty: '',

    use_type: '',
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

    };
    reader.readAsBinaryString(target.files[0]);
  }

  checkData(data: any): void {
    this.spinner = true;
    this.totalData = data.length * data[0].length;
    for(var i = 1; i<data.length; i++){
      // console.log('filas de datos: '+ data[i])
      for(var x=0; x<data[i].length; x++){
        this.subprogress = i*x;
        this.nuevoVin.emp_empresa = data[i][this.fieldControl.emp_empresa];
        this.nuevoVin.transaction = data[i][this.fieldControl.transaction];
        this.nuevoVin.bill = data[i][this.fieldControl.bill];
        this.nuevoVin.department = data[i][this.fieldControl.department];
        this.nuevoVin.location = data[i][this.fieldControl.location];
        this.nuevoVin.ubication = data[i][this.fieldControl.ubication];
        this.nuevoVin.bill_date = data[i][this.fieldControl.bill_date];
        this.nuevoVin.version = data[i][this.fieldControl.version];
        this.nuevoVin.model = data[i][this.fieldControl.model];
        this.nuevoVin.model_description = data[i][this.fieldControl.model_description];
        this.nuevoVin.customer = data[i][this.fieldControl.customer];
        this.nuevoVin.subtotal = data[i][this.fieldControl.subtotal];
        this.nuevoVin.total = data[i][this.fieldControl.total];
        this.nuevoVin.observations = data[i][this.fieldControl.observations];
        this.nuevoVin.version_description = data[i][this.fieldControl.version_description];
        this.nuevoVin.vin = data[i][this.fieldControl.vin];
        this.nuevoVin.retail_in_date = data[i][this.fieldControl.retail_in_date];
        this.nuevoVin.retail_out_date = data[i][this.fieldControl.retail_out_date];
        this.nuevoVin.fab_ini_warranty = data[i][this.fieldControl.fab_ini_warranty];
        this.nuevoVin.year = data[i][this.fieldControl.year];
        this.nuevoVin.fab_end_warranty = data[i][this.fieldControl.fab_end_warranty];
        this.nuevoVin.dealer_cod = data[i][this.fieldControl.dealer_cod];
        this.nuevoVin.engine = data[i][this.fieldControl.engine];
        this.nuevoVin.color = data[i][this.fieldControl.color];
        this.nuevoVin.sales_point = data[i][this.fieldControl.sales_point];
        this.nuevoVin.gao_type = data[i][this.fieldControl.gao_type];
        this.nuevoVin.gao_duration = data[i][this.fieldControl.gao_duration];
        this.nuevoVin.days_slopes_warranty = data[i][this.fieldControl.days_slopes_warranty];
        this.nuevoVin.use_type = data[i][this.fieldControl.use_type];

      }
      this.createNewVin(this.nuevoVin);
      
      if(this.progressSend === data.length){
        console.log('Carga terminada');
        this.spinner = false;
      }
    }
  }

  createNewVin(nuevoVin: any): void{
    this.vinService.newVin(nuevoVin)
    .subscribe((vin)=>{this.progressSend = 1 + this.progressSend; this.status='ok'}, (err)=> this.message = err)
  }

  

}
