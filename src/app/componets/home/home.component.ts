import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers:[UserService]
})
export class HomeComponent implements OnInit {
  public title:string;
  public identity;
  constructor(
    private _userService:UserService
  ) {
    this.title = 'Bienvenido a NGSOCIAL';
    this.identity = this._userService.getidentity();
  }

  ngOnInit() {

  }

}
