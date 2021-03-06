import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  providers:[UserService,FollowService]
})
export class FollowingComponent implements OnInit {
  public title:string;
  public url:string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public pages;
  public total;
  public follows;
  public following;
  public users:User[];
  public status:string;
  public userPageId;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _service:UserService,
    private _followService:FollowService
  ) {
    this.title = "Usuarios seguidos por";
    this.url = GLOBAL.url;
    this.identity=this._service.getidentity();
    this.token = this._service.getToken();

  }

  ngOnInit() {
    this.actualPage();

  }

  actualPage(){
    this._route.params.subscribe(params =>{
      let user_id = params['id'];
      this.userPageId = user_id;
      let page = +params['page'];
      this.page = page;
      //Si no existe el parametro
      if(!params['page']){
        page = 1;
      }

      if(!page){
        page = 1;
      }else{
        this.next_page = page+1;
        this.prev_page = page-1;
        //Pagina anterior
        if(this.prev_page <= 0){
          this.prev_page = 1;
        }
      }
      //Devolver un listado de usuarios
      this.getUser(user_id,page);

    })
  }

  //Get usuarios
  getFollows(user_id,page){
    this._followService.getFollowing(this.token,user_id,page).subscribe(
      response=>{
        if(!response['follows']){
          this.status ='error';
        }else{
          this.total = response['total'];
          this.following = response['follows'];
          this.pages = response['pages'];
          this.follows = response['users_following'];

          //verifica si es mayor que las paginas
          if(page > this.pages){
            this._router.navigate(['/gente',1]);
          }
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }

      }
    )
  }

  //Obtener el usuario logeado
  public user:User;
  getUser(user_id,page){
    this._service.getUser(user_id).subscribe(
      response=>{
        if(response['user']){
          this.user = response['user'];
          //Devolver listado de usuarios
          this.getFollows(user_id,page);
        }else{
          this._router.navigate(['/home']);
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  public followUserOver;
  mouseEnter(user_id){
    this.followUserOver = user_id;
  }

  mouseLeave(user_id){
    this.followUserOver = 0;
  }

  //Siguiendo un usuario
  followUser(followed){
    //instancia
    var follow = new Follow('',this.identity._id,followed);
    this._followService.addFollow(this.token,follow).subscribe(
      response=>{
        if(!response['follow']){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.follows.push(followed);
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }

      }
    )
  }

  //Dejar de seguir un usuario
  unfollowUser(followed){
    this._followService.deleteFollow(this.token,followed).subscribe(
      response=>{
        //buscar el elemento dentro del array
        var buscar = this.follows.indexOf(followed);
        if( buscar != -1){
          //borra elemento del array
          this.follows.splice(buscar,1);
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

}
