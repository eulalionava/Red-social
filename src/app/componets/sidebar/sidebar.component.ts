import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers:[UserService,PublicationService,UploadService]
})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public title:string;
  public publication:Publication;



  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _publicationService:PublicationService,
    private _uploadService:UploadService
  ){
    this.title = 'Mis datos';
    this.identity = this._userService.getidentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication("","","","",this.identity._id);
   }

  ngOnInit() {
    console.log("sidebar.component cargado");
  }

  onSubmit(form,event){
    this._publicationService.addPublication(this.token,this.publication).subscribe(
      response=>{
        if(response['publication']){
          //this.publication = response['publication'];

          //verifica si se sube alguna imagen
          if(this.filesToUpload && this.filesToUpload.length){
            //Subir imagen
            this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response['publication']._id,[],this.filesToUpload,this.token,'image')
                .then((result:any)=>{
                this.publication.file = result.image;
                this.status ='success';
                form.reset();
                //redirecciona y actualiza la publicacion
                this._router.navigate(['/timeline']);
                this.sended.emit({send:'true'});
                });
          }else{
                this.status ='success';
                form.reset();
                //redirecciona y actualiza la publicacion
                this._router.navigate(['/timeline']);
                this.sended.emit({send:'true'});
          }
        }else{
          this.status = 'error';
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

  //Subir una imagen
  public filesToUpload:Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  //Output  Generacion de un evento
  @Output() sended =  new EventEmitter();
  sendPublication(Event){
    this.sended.emit({send:'true'});
  }

}
