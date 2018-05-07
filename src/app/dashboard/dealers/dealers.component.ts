import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../services/dealer.service';
import { Dealer } from '../../class/dealer';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css']
})
export class DealersComponent implements OnInit {

  dealer: Dealer[];
  message: any;
  messageOk: any;
  edition: boolean;
  newDealer = {
    dealer_cod:'',
    name_dealer:'',
    subname_dealer:'',
    address:'',
    city:'',
    coordinate:'',
    type_dealer:'',
    group_dealer:'',
    zone:''
  }
  constructor( private dealerService: DealerService ) { }

  ngOnInit() {
    this.getDealers();
  }

  getDealers(): void {
    this.dealerService.getDealers()
    .subscribe( dealer=> this.dealer = dealer )
  }
  editDealer(dealer): void {
    this.dealerService.updateDealer(dealer)
    .subscribe( (err)=> this.message = err )
  }

  saveNewDealer(dealer:any): void {
    this.dealerService.newDealer(dealer)
    .subscribe( (dealer)=> {this.dealer = dealer; this.message=null;  this.newDealer = {
      dealer_cod:'',
      name_dealer:'',
      subname_dealer:'',
      address:'',
      city:'',
      coordinate:'',
      type_dealer:'',
      group_dealer:'',
      zone:''
    }; this.messageOk={msg:'se ha creado con éxito', on:true}},(err)=> this.message = err )
    this.getDealers();
  }

  enableEdition(): void {
    this.edition = true;
  }
  saveEdition(dealer: any): void {
    console.log(dealer);
    this.editDealer(dealer);
  }

}
