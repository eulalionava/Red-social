import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import $ from 'jquery';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html'
})
export class PublicationsComponent implements OnInit {
  public identity;
  public token;
  public title:string;
  public url:string
  public status:string;
  public total;
  public pages;
  public page;
  public itemsPerPage;
  public publications:Publication[];

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _publicationService:PublicationService
  ){
    this.title = 'Publicaciones';
    this.identity = this._userService.getidentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;
  }


  ngOnInit() {
    this.getPublications(this.page);
  }

  //Mostrar publicaciones
  getPublications(page,adding=false){
    this._publicationService.getPublications(this.token,page).subscribe(
      response=>{
        if(response['publications']){
          this.total = response['total_items'];
          this.pages = response['pages'];
          this.itemsPerPage = response['items_per_page'];
          //Va agregando mas publicaciones
          if(!adding){
            this.publications = response['publications'];
          }else{
            var arrayA = this.publications;
            var arrayB = response['publications'];
            this.publications = arrayA.concat(arrayB);

            //Animacion scroll
            $("html,body").animate({scrollTop:$("body").prop("scrollHeight")},500);
          }
          //mayor al numero de paginas
          if(page > this.pages){
            // this._router.navigate(['home']);
          }
        }else{
          this.status ='error';
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

  //METODO PARA VER MAS
  public noMore = false;
  viewMore(){
    if(this.publications.length == this.total){
      this.noMore = true;
    }else{
      this.page += 1;
    }
    this.getPublications(this.page,true);
  }

}
