import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('user'));
  constructor( private router:Router) { }

  ngOnInit() {
  }

  goTo(url:string):void{
    this.router.navigateByUrl(url)
  }

}
