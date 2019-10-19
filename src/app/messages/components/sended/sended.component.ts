import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,Params } from '@angular/router';
import { Message } from '../../../models/message';
import { Follow } from '../../../models/follow';
import { User } from '../../../models/user';
import { FollowService } from '../../../services/follow.service';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-sended',
  templateUrl: './sended.component.html',
  providers:[FollowService,MessageService,UserService]
})
export class SendedComponent implements OnInit {
  public title:string;
  public identity;
  public token;
  public url:string;
  public status:string;
  public messages:Message[];
  public pages;
  public total;
  public page;
  public next_page;
  public prev_page;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _followService:FollowService,
    private _messageService:MessageService,
    private _userService:UserService
  ){
    this.title = 'Mensajes enviados';
    this.identity = this._userService.getidentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
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
      //Devolver un listado de mensajes
      this.getMessages(this.token,this.page);

    })
  }

  //OBTENER LOS MENSAJES
  getMessages(token,page){
    this._messageService.getEmmitMessajes(token,page).subscribe(
      response=>{
        if(response['messages']){
          this.messages = response['messages'];
          this.total = response['total'];
          this.pages = response['pages'];
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
