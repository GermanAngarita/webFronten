import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-clinic',
  templateUrl: './service-clinic.component.html',
  styleUrls: ['./service-clinic.component.css']
})
export class ServiceClinicComponent implements OnInit {

  private user = JSON.parse(localStorage.getItem('user'));

  constructor() { }

  ngOnInit() {
  }

}
