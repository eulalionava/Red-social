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

  register(user:User){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    //regresa los datos
    return this._http.post(this.url+'register',params,{headers:headers});
  }
}
