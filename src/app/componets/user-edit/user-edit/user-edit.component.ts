import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { User } from 'src/app/models/user';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  providers:[UserService,UploadService]
})
export class UserEditComponent implements OnInit {
  public title:string;
  public user:User;
  public identity;
  public token;
  public status:string;
  public url:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _service:UserService,
    private _uploadService:UploadService
  ) {
    this.title = 'Actualizar mis datos';
    this.user = this._service.getidentity();
    this.identity = this.user;
    this.token = this._service.getToken();
    this.url =GLOBAL.url
   }

  ngOnInit() {
    console.log(this.user);
  }

  onSubmit(){
    this._service.updateUser(this.user).subscribe(
      response=>{
        if(!response['user']){
          this.status = 'error';
        }else{
          this.status = 'success';
          localStorage.setItem('identity',JSON.stringify(this.user))
          this.identity = this.user;

          //SUBIDA DE IMAGEN
          this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id,[],this.fileToUpload,this.token,'image')
            .then( (result:any)=>{
              console.log(result);
              this.user.image = result.user.image;
              localStorage.setItem('identity',JSON.stringify(this.user));
            });
        }
      },
      error=>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  public fileToUpload:Array<File>;
  fileChangeEvent(fileInput:any){
    this.fileToUpload =<Array<File>>fileInput.target.files;
    console.log(this.fileToUpload);
  }

}
