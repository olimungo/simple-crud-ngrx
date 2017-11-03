import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'movies', loadChildren: './movies/movies.module#MoviesModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' }
  // { path: 'companies', loadChildren: './companies/companies.module#CompaniesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
