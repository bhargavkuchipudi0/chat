import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule, Http } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from "@angular/forms";
import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { FeedsComponent } from './home/feeds/feeds.component'
import { FriendsComponent } from './home/friends/friends.component';
import { NotificationsComponent } from './home/notifications/notifications.component';
import { ProfileComponent } from './home/profile/profile.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children:[
      {
        path:'',
        redirectTo: '/home/Feeds',
        pathMatch: 'full'
      },
      { 
        path: 'Feeds',
        component: FeedsComponent
      },
      {
        path: 'Friends',
        component: FriendsComponent
      },
      {
        path: 'Notifications',
        component: NotificationsComponent
      },
      {
        path: 'Profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chat-box',
    component: ChatBoxComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ChatBoxComponent,
    FeedsComponent,
    FriendsComponent,
    NotificationsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
