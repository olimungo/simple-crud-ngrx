import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import { Movie } from '../movie.entity';

import * as MoviesActions from '../movies.actions';
import * as MoviesReducer from '../movies.reducer';

@Component({
  selector: 'feat-movies-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: Observable<Movie[]>;
  loading: Observable<boolean>;
  pattern = '';

  constructor(private router: Router, private store: Store<MoviesReducer.State>) {
    this.store.dispatch(new MoviesActions.GetList());
    this.movies = this.store.select(MoviesReducer.getMovies);
    this.loading = this.store.select(MoviesReducer.getLoading);

    this.store.select(MoviesReducer.getFilterPattern).subscribe(pattern => {
      this.pattern = pattern;
    });
  }

  ngOnInit() {
  }

  edit(id: string) {
    this.router.navigate(['movies', id]);
  }

  add() {
    this.router.navigate(['movies/add']);
  }

  patternChange(pattern: string) {
    this.store.dispatch(new MoviesActions.Filter(pattern));
  }
}
