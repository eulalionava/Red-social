import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers:[UserService]
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public title:string;

  constructor(
    private _userService:UserService
  ){
    this.title = 'Mis datos';
    this.identity = this._userService.getidentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
   }

  ngOnInit() {
    console.log("sidebar.component cargado");
  }

}
