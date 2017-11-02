import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Movie } from './movie.entity';
import * as movieActions from './movies.actions';
export type Action = movieActions.All;

@Injectable()
export class MoviesService {
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
    .mergeMap(() => this.http.get(`${environment.backEnd}/movies`))
    .map(result => result.json())
    .map((result: Movie[]) => result.sort((a, b) => a.title > b.title  ? 1 : -1))
    .map(movies => {
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
