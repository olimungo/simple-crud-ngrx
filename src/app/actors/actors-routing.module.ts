import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActorsListComponent } from './list/list.component';
import { ActorEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: ActorsListComponent },
  { path: 'add', component: ActorEditComponent },
  { path: ':id', component: ActorEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule {}
