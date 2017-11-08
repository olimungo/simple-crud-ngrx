import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import * as MoviesActions from '../../../movies/state/movies.actions';
import * as MoviesReducer from '../../../movies/state/movies.reducer';
import * as UsersActions from '../../../users/state/users.actions';
import * as UsersReducer from '../../../users/state/users.reducer';

@Component({
  selector: 'core-shell-header',
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

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
