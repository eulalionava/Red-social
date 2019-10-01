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
  public followed;
  public following;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _followService:FollowService
  ){
    this.title = 'Perfil';
    this.identity = this._userService.getidentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.followed = false;
    this.following = false;
   }

  ngOnInit() {
    this.loadPage();
  }

  loadPage(){
    //Obtener los parametros que vienen por url
    this._route.params.subscribe(params=>{
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);
    });
  }
  //Usuarios
  getUser(id){
    this._userService.getUser(id).subscribe(
      response=>{
        if(response['user']){
          console.log(response);
          this.user = response['user'];

          //Verifica si, sigo ese usuario
          if(response['following']!= null){
            this.following = true;
          }else{
            this.following =  false;
          }

          //Verifica si me sigue
          if(response['followed'] != null){
            this.followed = true;
          }else{
            this.followed = false;
          }

        }else{
          this.stats = 'error';
        }
      },
      error=>{
        console.log(<any>error);
        this._router.navigate(['/perfil',this.identity._id]);
      }
    )
  }
  //Contar la cantidad de usuarios
  getCounters(id){
    this._userService.getCounter(id).subscribe(
      response=>{
        this.stats = response;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Seguir a un usuario desde su perfil
  followUser(followed){
    var follow = new Follow('',this.identity._id,followed);
    this._followService.addFollow(this.token,follow).subscribe(
      response=>{
        this.following = true;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Dejar de seguir un usuario desde el perfil
  unfollowUser(followed){
    this._followService.deleteFollow(this.token,followed).subscribe(
      response=>{
        this.following = false;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Efecto del  botton
  public followUserOver;
  mouseEnter(user_id){
    this.followUserOver = user_id;
  }

  mouseLeave(){
    this.followUserOver = 0;
  }
}
