import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import $ from 'jquery';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  providers:[UserService,PublicationService]
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
  @Input() user:string;

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
    this.getPublications(this.user,this.page);
  }

  //Mostrar publicaciones
  getPublications(user,page,adding=false){
    this._publicationService.getPublicationsUser(this.token,user,page).subscribe(
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
            //Va concatenando las publicaciones
            this.publications = arrayA.concat(arrayB);


            if(this.publications.length === this.total){
              this.noMore = true;
            }

            //Animacion scroll
            $("html,body").animate({scrollTop:$("html").prop("scrollHeight")},500);
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
    this.page += 1;
    if(this.page == this.total){
      this.noMore = true;
    }

    this.getPublications(this.user,this.page,true);
  }

}
