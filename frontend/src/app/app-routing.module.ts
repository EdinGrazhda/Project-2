import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'main',
  },
  {
    path:'main',
    component:MainComponent
  },
  {
    path:'userdetails',
    component:UserDetailsComponent
  },
  {
    path:'create',
    component:CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
