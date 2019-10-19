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
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers:[FollowService,MessageService,UserService]
})
export class AddComponent implements OnInit {
  public title:string;
  public message:Message;
  public identity;
  public token;
  public url:string;
  public status:string;
  public follows;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _followService:FollowService,
    private _messageService:MessageService,
    private _userService:UserService
  ) {
    this.title = 'Mensajes enviados';
    this.identity = this._userService.getidentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.message = new Message('','','','',this.identity._id,'');
  }

  ngOnInit() {
    this.getmyfollows();
  }

  onSubmit(form){
    this._messageService.addMessage(this.token,this.message).subscribe(
      response=>{
        if(response['message']){
          this.status = 'success';
          form.reset();
        }
      },
      error=>{
        this.status = 'error';
      }
    )
  }

  getmyfollows(){
    this._followService.getMyFollows(this.token).subscribe(
      response=>{
        this.follows = response['follows'];
        console.log(this.follows);

      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
