import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ActorsService } from '../actors.service';

import * as ActorsActions from './actions';
export type Action = ActorsActions.All;

@Injectable()
export class Effects {
  private actorsLoaded = false;

  constructor(private actions: Actions, private http: Http, private actorsService: ActorsService) { }

  @Effect()
  retrieve: Observable<Action> = this.actions.ofType(ActorsActions.GET_LIST)
    .map(() => {
      if (!this.actorsLoaded) {
        return new ActorsActions.GetListForced();
      } else {
        return new ActorsActions.NoAction();
      }
    });

  @Effect()
  retrieveForced: Observable<Action> = this.actions.ofType(ActorsActions.GET_LIST_FORCED)
    .mergeMap(() => this.actorsService.retrieve())
    .map(actors => {
      this.actorsLoaded = true;
      return new ActorsActions.ListRetrieved(actors);
    });

  @Effect()
  create: Observable<Action> = this.actions.ofType(ActorsActions.CREATE)
    .map((action: ActorsActions.Create) => action.payload)
    .mergeMap(actor => this.actorsService.create(actor))
    .map(actor => new ActorsActions.CreateDone(actor));

  @Effect({ dispatch: false })
  update: Observable<Action> = this.actions.ofType(ActorsActions.UPDATE)
    .map((action: ActorsActions.Update) => action.payload)
    .mergeMap(actor => this.actorsService.update(actor));

  @Effect({ dispatch: false })
  delete = this.actions.ofType(ActorsActions.DELETE)
    .map((action: ActorsActions.Delete) => action.payload)
    .mergeMap(id => this.actorsService.delete(id));
}
