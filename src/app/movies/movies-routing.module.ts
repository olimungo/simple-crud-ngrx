import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListComponent } from './list/list.component';
import { MovieEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'add', component: MovieEditComponent },
  { path: ':id', component: MovieEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
