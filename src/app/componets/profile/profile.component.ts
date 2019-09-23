import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers:[UserService,FollowService]
})
export class ProfileComponent implements OnInit {
  public title:string;
  public user:User;
  public status:string;
  public identity;
  public token;
  public stats;
  public url;
  public follow;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _followService:FollowService
  ){
    this.title = 'Perfil';
    this.identity = this._userService.identity();
    this.token = this._userService.token();
    this.url = GLOBAL.url;
   }

  ngOnInit() {
  }

}
