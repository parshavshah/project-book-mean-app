import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './project/create/create.component';
import { ListComponent } from './project/list/list.component';
import { ReadComponent } from './project/read/read.component';
import { UpdateComponent } from './project/update/update.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SignupComponent } from './user/signup/signup.component';
import { VerifyComponent } from './user/verify/verify.component';

const routes: Routes = [
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'projects',
    component: ListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'project/:id',
    component: ReadComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-project',
    component: CreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'project/update/:id',
    component: UpdateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'project/read/:id',
    component: ReadComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
