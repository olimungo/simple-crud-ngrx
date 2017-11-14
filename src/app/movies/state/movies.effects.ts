import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import { MoviesService } from '../movies.service';

import * as MovieActions from './movies.actions';
export type Action = MovieActions.All;

@Injectable()
export class Effects {
  private moviesLoaded = false;
  private actorsLoaded = false;

  constructor(private actions: Actions, private http: Http, private moviesService: MoviesService) { }

  @Effect()
  create: Observable<Action> = this.actions.ofType(MovieActions.CREATE)
    .map((action: MovieActions.Create) => action.payload)
    .mergeMap(movie => this.moviesService.create(movie))
    .map(movie => new MovieActions.CreateDone(movie));

  @Effect()
  retrieve: Observable<Action> = this.actions.ofType(MovieActions.GET_LIST)
    .map(() => {
      if (this.moviesLoaded && this.actorsLoaded) {
        return new MovieActions.NoAction();
      }

      if (!this.moviesLoaded) {
        return new MovieActions.GetListForced();
      }

      if (!this.actorsLoaded) {
        return new MovieActions.GetListActorsForced();
      }
    });

  @Effect()
  retrieveForced: Observable<Action> = this.actions.ofType(MovieActions.GET_LIST_FORCED)
    .mergeMap(() => this.moviesService.retrieve())
    .map(retrieveResult => {
      this.moviesLoaded = true;
      return new MovieActions.ListRetrieved(retrieveResult);
    });

  @Effect()
  retrieveActorsForced: Observable<Action> = this.actions.ofType(MovieActions.GET_LIST_FORCED)
    .mergeMap(() => this.moviesService.retrieveActors())
    .map(actors => {
      this.moviesLoaded = true;
      return new MovieActions.ListActorsRetrieved(actors);
    });

  @Effect({ dispatch: false })
  update: Observable<Action> = this.actions.ofType(MovieActions.UPDATE)
    .map((action: MovieActions.Update) => action.payload)
    .mergeMap(movie => this.moviesService.update(movie));

  @Effect({ dispatch: false })
  delete = this.actions.ofType(MovieActions.DELETE)
    .map((action: MovieActions.Delete) => action.payload)
    .mergeMap(id => this.moviesService.delete(id));
}
