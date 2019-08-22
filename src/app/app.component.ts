import { Component,OnInit,DoCheck } from '@angular/core';
import {UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit,DoCheck{
  public title:string;
  public identity;

  constructor(
    private _service:UserService
  ){
    this.title = 'NGSOCIAL'
  }

  ngOnInit(){
    this.identity = this._service.getidentity();
    console.log(this.identity);
  }

  //Monitorea ls cambios
  ngDoCheck(){
    this.identity = this._service.getidentity();
  }
}
