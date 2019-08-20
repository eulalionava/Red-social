import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  public title:string;
  public user:User;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _service:UserService
  ) {
    this.title = 'Identificate';
    this.user=new User('','','','','','','ROLE_USER','')
   }

  ngOnInit() {
  }

  onSubmit(){
    alert(this.user.email);
    alert(this.user.password);
    console.log(this.user);
  }

}
