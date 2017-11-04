import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as MoviesActions from './movies.actions';
import * as MoviesReducer from './movies.reducer';

import { Movie } from './movie.entity';

@Component({
  selector: 'feat-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Observable<Movie[]>;
  selectedMovie: Observable<Movie>;
  loading: Observable<boolean>;

  constructor(private route: ActivatedRoute, private location: Location, private store: Store<MoviesReducer.State>) {
    this.movies = this.store.select(MoviesReducer.getMovies);
    this.selectedMovie = this.store.select(MoviesReducer.getSelectedMovie);
    this.loading = this.store.select(MoviesReducer.getLoading);
    this.store.dispatch(new MoviesActions.SetUrl(this.location.path()));
    this.store.dispatch(new MoviesActions.GetList());

    this.store.select(MoviesReducer.getUrl).subscribe(url => this.location.go(url));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new MoviesActions.Edit(params['id']));
      }
    });
  }

  edit(id: string) {
    this.store.dispatch(new MoviesActions.Edit(id));
  }

  save(user: Movie) {
    if (user.id) {
      this.store.dispatch(new MoviesActions.Update(user));
    } else {
      this.store.dispatch(new MoviesActions.Create(user));
    }
  }

  cancel() {
    this.store.dispatch(new MoviesActions.Cancel());
  }

  delete(id: string) {
    this.store.dispatch(new MoviesActions.Delete(id));
  }

  add() {
    this.store.dispatch(new MoviesActions.Add());
  }

  patternChange(pattern: string) {
    this.store.dispatch(new MoviesActions.Filter(pattern));
  }
}
