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
  public stats;

  constructor(public _http:HttpClient){
    this.url = GLOBAL.url;
  }
  //SERVICIO DE REGISTRO
  register(user:User):Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    //regresa los datos
    return this._http.post(this.url+'register',params,{headers:headers});
  }

  //SERVICIO ENCARGADO DEL LOGEO DE USUARIO
  Signup(user,gettoken=null){
    if(gettoken != null){
      user = Object.assign(user, {gettoken});
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

  //Conseguir la infomacion de localStorage
  getStats(){
    let stats = JSON.parse(localStorage.getItem('stats'));
    if(stats != 'undefined'){
      this.stats = stats;
    }else{
      this.stats = null;
    }
    return this.stats;
  }

  //Servicio que cuenta
  getCounter(userId = null){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',this.getToken());

    if(userId != null){
      return this._http.get(this.url+'counters/'+userId, {headers:headers} );
    }else{
      return this._http.get(this.url+'counters',{headers:headers});
    }
  }

  //Servicio que actualiza los datos
  updateUser(user:User){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',this.getToken());

    return this._http.put(this.url+'update-user/'+user._id,params,{headers:headers});
  }

  //Obtener los usuarios por pagina
  getUsers(page = null){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',this.getToken());

    return this._http.get(this.url + 'users/' + page,{headers:headers});
  }

  //Obtener los usuarios por id
  getUser(id){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',this.getToken());

    return this._http.get(this.url + 'user/' + id,{headers:headers});
  }

}
