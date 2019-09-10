import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
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
  public users:User[];
  public status:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _service:UserService
  ) {
    this.title = "Gente";
    this.url = GLOBAL.url;
    this.identity=this._service.getidentity();
    this.token = this._service.getToken();
  }

  ngOnInit() {
    console.log("component.users");
    this.actualPage();
  }

  actualPage(){
    this._route.params.subscribe(params =>{
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

      //Devolver listado de usuarios
      this.getUsers(page);

    })
  }

  //Get usuarios
  getUsers(page){
    this._service.getUsers(page).subscribe(
      response=>{
        if(!response['users']){
          this.status ='error';
        }else{
          console.log(response);
          this.total = response['total'];
          this.users = response['users'];
          this.pages = response['pages'];
          this.follows = response['users_following'];
          console.log(this.follows);
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

  public followUserOver;

  mouseEnter(user_id){
    this.followUserOver = user_id;
  }

  mouseLeave(user_id){
    this.followUserOver = 0;
  }

}
