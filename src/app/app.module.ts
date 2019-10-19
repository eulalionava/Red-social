import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing,appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Modulo custom
import { MessagesModule } from './messages/messages.module';

//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/login/login.component';
import { RegisterComponent } from './componets/register/register.component';
import { HomeComponent } from './componets/home/home.component';
import { UserEditComponent } from './componets/user-edit/user-edit/user-edit.component';
import { UsersComponent } from './componets/users/users/users.component';
import { SidebarComponent } from './componets/sidebar/sidebar.component';
import { TimelineComponent } from './componets/timeline/timeline/timeline.component';
import { MomentModule } from 'angular2-moment';
import { PublicationsComponent } from './componets/publications/publications.component';
import { ProfileComponent } from './componets/profile/profile.component';
import { FollowingComponent } from './componets/following/following.component';
import { FollowedComponent } from './componets/followed/followed.component';

//Servicios
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule,
    MessagesModule
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
