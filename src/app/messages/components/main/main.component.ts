import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  public title:string;

  constructor() {
    this.title = 'Mensajes privados';
   }

  ngOnInit() {
  }

}
