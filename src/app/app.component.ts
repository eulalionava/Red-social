import { Component,OnInit,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import {UserService } from './services/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit,DoCheck{
  public title:string;
  public identity;
  public url:string;

  constructor(
    private _service:UserService,
    private _router:Router
  ){
    this.title = 'NGSOCIAL'
    this.url=GLOBAL.url;
  }

  ngOnInit(){
    this.identity = this._service.getidentity();
    console.log(this.identity);
  }

  //Monitorea ls cambios
  ngDoCheck(){
    this.identity = this._service.getidentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }
}
