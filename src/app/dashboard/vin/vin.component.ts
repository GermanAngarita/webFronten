import { Component, OnInit } from '@angular/core';
import { Vin } from '../../class/vin';
import { VinsService } from '../../services/vins.service';

@Component({
  selector: 'app-vin',
  templateUrl: './vin.component.html',
  styleUrls: ['./vin.component.css']
})
export class VinComponent implements OnInit {
  private user = JSON.parse(localStorage.getItem('user'));
  body:any = {
    vin:''
  }
  vin:any = []
  err:any=[]
  constructor( private vinService: VinsService) { }

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
