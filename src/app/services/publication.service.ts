import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { Publication } from '../models/publication';

@Injectable()
export class PublicationService{
  public url:string;

  constructor(private _http:HttpClient){
    this.url =GLOBAL.url;
  }

  //Permite aggregar nuevas publicaciones
  addPublication(token,publication){
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);

    return this._http.post(this.url+'publication',params,{headers:headers});
  }

  //Permite obtener las publicaciones
  getPublications(token,page=1){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
    return this._http.get(this.url+'publications/'+page,{headers:headers})
  }

  //Permite obtener las publicaciones por usuario
  getPublicationsUser(token,user_id,page=1){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);
    return this._http.get(this.url+'publications-user/'+user_id+'/'+page,{headers:headers})
  }

  //Borrar una publicacion
  deletePublication(token,id){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);

    return this._http.get(this.url+'publication/'+id,{headers:headers});
  }
}
