import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { Follow } from '../models/follow';

@Injectable()
export class FollowService{
  public url:string;

  constructor(private _http:HttpClient){
    this.url = GLOBAL.url;
  }
  //Para poder guardar un follor a base de datos
  addFollow(token,follow){
    let params = JSON.stringify(follow);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);

    return this._http.post(this.url+'follow',params,{headers:headers});
  }


  deleteFollow(token,id){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);

    return this._http.delete(this.url+'follow/'+id,{headers:headers});
  }

  //Obtener los seguidores
  getFollowing(token,userId=null,page=1){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
    var url = this.url+'following';
    if(userId != null){
      url = this.url+'following/'+userId+'/'+page;
    }
    return this._http.get(this.url+'following/'+userId+'/'+page,{headers:headers});
  }
}
