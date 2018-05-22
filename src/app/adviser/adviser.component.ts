import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css']
})
export class AdviserComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  menu:boolean;
  constructor() { }

  ngOnInit() {
  }

}
