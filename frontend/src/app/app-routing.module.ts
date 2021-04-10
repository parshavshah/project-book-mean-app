import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './project/create/create.component';
import { ListComponent } from './project/list/list.component';
import { ReadComponent } from './project/read/read.component';
import { UpdateComponent } from './project/update/update.component';
import { LoginComponent } from './user/login/login.component';
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
    path: 'projects',
    component: ListComponent
  },
  {
    path: 'project/:id',
    component: ReadComponent
  },
  {
    path: 'create-project',
    component: CreateComponent
  },
  {
    path: 'project/update/:id',
    component: UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
