import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
  public url:string

  constructor(public _http:HttpClient){
    this.url = GLOBAL.url;
  }

  register(to_user_register){
    console.log(to_user_register);
    console.log(this.url);
  }
}
