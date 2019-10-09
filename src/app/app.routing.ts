import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

//componentes
import { LoginComponent } from './componets/login/login.component';
import { RegisterComponent } from './componets/register/register.component';
import { HomeComponent } from './componets/home/home.component';
import { UserEditComponent } from './componets/user-edit/user-edit/user-edit.component';
import { UsersComponent } from './componets/users/users/users.component';
import { TimelineComponent } from './componets/timeline/timeline/timeline.component';
import { ProfileComponent } from './componets/profile/profile.component';
import { FollowingComponent } from './componets/following/following.component';


const appRoutes:Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegisterComponent},
  {path:'mis-datos',component:UserEditComponent},
  {path:'gente',component:UsersComponent},
  {path:'gente/:page',component:UsersComponent},
  {path:'timeline',component:TimelineComponent},
  {path:'perfil/:id',component:ProfileComponent},
  {path:'siguiendo/:id/:page',component:FollowingComponent}


]

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes)
