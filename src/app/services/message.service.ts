import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { Message } from '../models/message';

@Injectable()
export class MessageService{
  public url:string;

  constructor(private _http:HttpClient){
    this.url = GLOBAL.url;
  }

  //AGREGAR UN MENSAJE
  addMessage(token,message){
    let params = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);

    return this._http.post(this.url+'message',params,{headers:headers});
  }

  //OBTENER LOS MENSAJES
  getMyMessajes(token,page=1){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);

    return this._http.get(this.url+'my-messages/'+page,{headers:headers});
  }

  //LISTADO DE MENSAJES ENVIADOS
  getEmmitMessajes(token,page=1){
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization',token);

    return this._http.get(this.url+'messages/'+page,{headers:headers});
  }

}
