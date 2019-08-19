import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

//componentes
import { LoginComponent } from './componets/login/login.component';
import { RegisterComponent } from './componets/register/register.component';

const appRoutes:Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegisterComponent}
]

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes)
