import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('user'));
  menu:boolean;

  constructor() { }

  ngOnInit() {
  }

}
