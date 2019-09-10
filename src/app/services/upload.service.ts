import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';

@Injectable()
export class UploadService{
  public url:string;

  constructor(){
    this.url = GLOBAL.url;
  }
  //Servicio para subir la imagen de perfil
  makeFileRequest(url:string,params:Array<string>,files:Array<File>,token:string,name:string){
    return new Promise(function(resolve,reject){
      var formData:any = new FormData();
      var xhr =new XMLHttpRequest();
      //Recorremos cada unos de los archivos
      for(var i = 0; i<files.length; i++){
        formData.append(name,files[i],files[i].name);
      }
      xhr.onreadystatechange= function(){
        if(xhr.readyState==4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      //Realizamos la peticion
      xhr.open('post',url,true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);

    })
  }

}
