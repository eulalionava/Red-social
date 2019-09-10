import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  public title:string;
  public status:string;
  public user:User;
  public identity;
  public token;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _service:UserService
  ) {
    this.title = 'Identificate';
    //Intancia el modelo
    this.user=new User('','','','','','','ROLE_USER','')
   }

  ngOnInit() {
  }

  onSubmit(){
    //Logear al usuario y conseguir sus datos
    this._service.Signup(this.user).subscribe(
      response=>{
        this.identity = response['user'];
        //verifica que lleve algo
        if(!this.identity || !this.identity._id){
          this.status = 'error';
        }else{
          //peristir datos de usuario
          localStorage.setItem('identity',JSON.stringify(this.identity));
          //Obtener el token
          this.gettoken();
        }

      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  //OBTIENE EL TOKEN
  gettoken(){
    this._service.Signup(this.user,'true').subscribe(
      response=>{
        this.token = response['token'];
        console.log(this.token);
        //verifica que lleve algo
        if(this.token.length <= 0){
          this.status = 'error';
        }else{
          //peristir token de usuario
          localStorage.setItem('token',this.token);

          //Conseguir los contadores o estadisticas del usuario
          this.getCounters();
        }

      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  getCounters(){
    this._service.getCounter().subscribe(
      response=>{
        localStorage.setItem('stats',JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/']);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
