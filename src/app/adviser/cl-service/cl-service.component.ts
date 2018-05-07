import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-cl-service',
  templateUrl: './cl-service.component.html',
  styleUrls: ['./cl-service.component.css']
})
export class ClServiceComponent implements OnInit {

  clinics:any=[]
  search:any = {
    active:true,
    page:0,
    maxSize:10
  } 
  constructor( private clinicService:ClinicService, private router:Router) { }

  ngOnInit() {
    this.getCLinics()
  }

  getCLinics(): void {
    this.clinicService.getClinicForAdvisor()
    .subscribe( clinics => this.clinics = clinics)
  }
  goToFormClinic(clinic:any):void{
    let id=clinic._id
    this.router.navigate(['/adviser/clinicform/'+id])
  }

}
