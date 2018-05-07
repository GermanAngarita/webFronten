import { Component, OnInit } from '@angular/core';
import { VinsService } from '../../services/vins.service';

@Component({
  selector: 'app-search-vin',
  templateUrl: './search-vin.component.html',
  styleUrls: ['./search-vin.component.css']
})
export class SearchVinComponent implements OnInit {

  body:any = {
    vin:''
  }
  vin:any = []
  err:any=[]
  constructor( private vinService:VinsService) { }

  ngOnInit() {
  }

  getVin():void{
    this.vin = []
    this.err = []
    if(this.body.vin){
      this.vinService.getVins(this.body)
      .subscribe( getVins => {this.vin = JSON.parse(getVins)}, err =>{this.err = err } )
    } else {
      window.confirm('Por favor revisa que el vin esté bien escrito')
    }
  }


}
