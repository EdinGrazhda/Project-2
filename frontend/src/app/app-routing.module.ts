import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateComponent } from './create/create.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

import { TaskupdateComponent } from './taskupdate/taskupdate.component';
import { Create2Component } from './create2/create2.component';

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
  },
  {
    path:'create/:id',
    component:CreateComponent
  },
  {
    path:'tasksdetails',
    component:TaskDetailsComponent
  },
  {
    path:'createtasks',
    component:Create2Component
  },
  { 
    path: 'taskupdate/:id', 
    component:TaskupdateComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
