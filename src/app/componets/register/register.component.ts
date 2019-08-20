import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers:[UserService]
})
export class RegisterComponent implements OnInit {
  public title:string;
  public user:User;
  public estatus:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _service:UserService
  ) {
    this.title = 'Registrate';
    this.user = new User('','','','','','','ROLE_USER','')
   }

  ngOnInit() {
  }

  onSubmit(form){
    //llama al servicio
    this._service.register(this.user).subscribe(
      response=>{
        if(response['user'] && response['user']._id){
          this.estatus = 'success';
          form.reset();
        }else{
          this.estatus ='error';
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
