import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import * as MoviesActions from '../../../movies/state/movies.actions';
import * as MoviesReducer from '../../../movies/state/movies.reducer';
import * as ActorsActions from '../../../actors/state/actors.actions';
import * as ActorsReducer from '../../../actors/state/actors.reducer';

@Component({
  selector: 'core-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ShellHeaderComponent implements OnInit {
  moviesCount: Observable<string>;
  actorsCount: Observable<string>;

  constructor(private router: Router,
    private storeActors: Store<ActorsReducer.State>,
    private storeMovies: Store<MoviesReducer.State>) {
    this.actorsCount = this.storeActors.select(ActorsReducer.getActorsCount);
    this.moviesCount = this.storeMovies.select(MoviesReducer.getMoviesCount);
    // this.storeActors.dispatch(new ActorsActions.GetList());
    // this.storeMovies.dispatch(new MoviesActions.GetList());
  }

  ngOnInit() {
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
