import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';

import { Movie } from './movie.entity';
import * as movieActions from './movies.actions';
export type Action = movieActions.All;

@Injectable()
export class MoviesService {
  private movies: Observable<Movie[]>;

  constructor(private actions: Actions, private http: Http) { }

  @Effect()
  create: Observable<Action> = this.actions.ofType(movieActions.CREATE)
    .map((action: movieActions.Create) => action.payload)
    .mergeMap(movie => {
      movie.id = new Date().getTime().toString();
      return this.http.post(`${environment.backEnd}/movies`, movie);
    })
    .map(() => new movieActions.NoAction());

  @Effect()
  retrieve: Observable<Action> = this.actions.ofType(movieActions.GET_LIST)
    .mergeMap(() => {
      if (this.movies) {
        return this.movies;
      } else {
        return this.http.get(`${environment.backEnd}/movies`).delay(1000).map(movies => movies.json());
      }
    })
    .map((result: Movie[]) => result.sort((a, b) => a.title > b.title  ? 1 : -1))
    .map(movies => {
      this.movies = Observable.of(movies);
      return new movieActions.ListRetrieved(movies);
    });

  @Effect()
  update: Observable<Action> = this.actions.ofType(movieActions.UPDATE)
    .map((action: movieActions.Update) => action.payload)
    .mergeMap(movie => {
      return this.http.put(`${environment.backEnd}/movies/${movie.id}`, movie);
    })
    .map(() => new movieActions.NoAction());

  @Effect()
  delete = this.actions.ofType(movieActions.DELETE)
    .map((action: movieActions.Delete) => action.payload)
    .mergeMap(id => {
      return this.http.delete(`${environment.backEnd}/movies/${id}`);
    })
    .map(() => new movieActions.NoAction());
}
