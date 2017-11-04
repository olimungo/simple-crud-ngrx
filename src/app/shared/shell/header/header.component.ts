import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import * as MoviesActions from '../../../movies/movies.actions';
import * as MoviesReducer from '../../../movies/movies.reducer';
import * as UsersActions from '../../../users/users.actions';
import * as UsersReducer from '../../../users/users.reducer';

@Component({
  selector: 'shr-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ShellHeaderComponent implements OnInit {
  moviesCount: Observable<string>;
  usersCount: Observable<string>;

  constructor(private router: Router,
    private storeUsers: Store<UsersReducer.State>,
    private storeMovies: Store<MoviesReducer.State>) {
    this.usersCount = this.storeUsers.select(UsersReducer.getUsersCount);
    this.moviesCount = this.storeMovies.select(MoviesReducer.getMoviesCount);
    // this.storeUsers.dispatch(new UsersActions.GetList());
    // this.storeMovies.dispatch(new MoviesActions.GetList());
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
