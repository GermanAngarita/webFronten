import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  menu:boolean;

  constructor() { }

  ngOnInit() {
  }

}
