import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { VerifyComponent } from './user/verify/verify.component';
import { CreateComponent } from './project/create/create.component';
import { UpdateComponent } from './project/update/update.component';
import { ReadComponent } from './project/read/read.component';
import { ListComponent } from './project/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/common.service';
import { ManageCommentComponent } from './project/manage-comment/manage-comment.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileComponent } from './user/profile/profile.component';

export function tokenGetter() {
  return localStorage.getItem("authToken");
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter
  }
};


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    VerifyComponent,
    CreateComponent,
    UpdateComponent,
    ReadComponent,
    ListComponent,
    ManageCommentComponent,
    DateAgoPipe,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_Module_Options)

  ],
  providers: [CommonService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
