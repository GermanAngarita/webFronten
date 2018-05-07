import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private user = JSON.parse(localStorage.getItem('user'));
  constructor( private router:Router) { }

  

  ngOnInit() {
  }
  
  goTo(url:string):void{
    this.router.navigateByUrl(url)
  }

}
