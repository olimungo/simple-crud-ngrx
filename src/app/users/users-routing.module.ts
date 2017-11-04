import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './list/list.component';
import { UserEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'add', component: UserEditComponent },
  { path: ':id', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
