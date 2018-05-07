import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-up-loads',
  templateUrl: './up-loads.component.html',
  styleUrls: ['./up-loads.component.css']
})
export class UpLoadsComponent implements OnInit {

  constructor( private router:Router ) { }

  ngOnInit() {
  }

  goTo () {
    this.router.navigateByUrl('dealer/uploadMaintenance')
  }

}
