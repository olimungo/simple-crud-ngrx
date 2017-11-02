import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'companies', loadChildren: './companies/companies.module#CompaniesModule' },
  { path: 'movies', loadChildren: './movies/movies.module#MoviesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
