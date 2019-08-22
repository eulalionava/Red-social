import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
  public url:string
  public identity;
  public token;

  constructor(public _http:HttpClient){
    this.url = GLOBAL.url;
  }
  //SERVICIO DE REGISTRO
  register(user:User){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    //regresa los datos
    return this._http.post(this.url+'register',params,{headers:headers});
  }

  //SERVICIO ENCARGADO DEL LOGEO DE USUARIO
  Signup(user:User,gettoken=null){
    if(gettoken != null){
      user = Object.assign(user,{gettoken} );
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login',params,{headers:headers});
  }

  //Servicio que obtiene los datos de usuario
  getidentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != 'undefined'){
      this.identity = identity;
    }else{
      this.identity=null;
    }
    return this.identity;
  }

  //Servicio que obtiene el token
  getToken(){
    let token = localStorage.getItem('token');
    if(token != 'undefined'){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

}
