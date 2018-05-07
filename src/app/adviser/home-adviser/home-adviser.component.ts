import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-adviser',
  templateUrl: './home-adviser.component.html',
  styleUrls: ['./home-adviser.component.css']
})
export class HomeAdviserComponent implements OnInit {

  images:any[]=[
    '../../../assets/background2.jpg',
    '../../../assets/background.jpg'
  ]
  avisos:any[]=[
    { 
      tag:'clinicas', 
      createUp:'18/04/2018', 
      title:'Nueva Clinica de servicio', 
      content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus reprehenderit tempora facere exercitationem non suscipit! Voluptatem reiciendis neque reprehenderit quis sequi eius distinctio voluptatibus, autem quasi dolorem laborum fugit eos? ', 
      user:{ 
        name:'German Angarita', 
        role:'mamager', 
        dealer:'all'}
    },
    { 
      tag:'campapas', 
      createUp:'18/04/2018', 
      title:'Cerato Pro', 
      content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus reprehenderit tempora facere exercitationem non suscipit! Voluptatem reiciendis neque reprehenderit quis sequi eius distinctio voluptatibus, autem quasi dolorem laborum fugit eos? ', 
      user:{ 
        name:'German Angarita', 
        role:'mamager', 
        dealer:'all'}
    },
    { 
      tag:'capacitacion', 
      createUp:'18/04/2018', 
      title:'FLC Like Care', 
      content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus reprehenderit tempora facere exercitationem non suscipit! Voluptatem reiciendis neque reprehenderit quis sequi eius distinctio voluptatibus, autem quasi dolorem laborum fugit eos? ', 
      user:{ 
        name:'German Angarita', 
        role:'mamager', 
        dealer:'all'}
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
