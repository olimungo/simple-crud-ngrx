import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ActorsService } from '../actors.service';

import * as ActorActions from './actors.actions';
export type Action = ActorActions.All;

@Injectable()
export class Effects {
  private actorsLoaded = false;

  constructor(private actions: Actions, private http: Http, private actorsService: ActorsService) { }

  @Effect()
  create: Observable<Action> = this.actions.ofType(ActorActions.CREATE)
    .map((action: ActorActions.Create) => action.payload)
    .mergeMap(actor => this.actorsService.create(actor))
    .map(actor => new ActorActions.CreateDone(actor));

  @Effect()
  retrieve: Observable<Action> = this.actions.ofType(ActorActions.GET_LIST)
    .map(() => {
      if (!this.actorsLoaded) {
        return new ActorActions.GetListForced();
      } else {
        return new ActorActions.NoAction();
      }
    });

  @Effect()
  retrieveForced: Observable<Action> = this.actions.ofType(ActorActions.GET_LIST_FORCED)
    .mergeMap(() => this.actorsService.retrieve())
    .map(actors => {
      this.actorsLoaded = true;
      return new ActorActions.ListRetrieved(actors);
    });

  @Effect({ dispatch: false })
  update: Observable<Action> = this.actions.ofType(ActorActions.UPDATE)
    .map((action: ActorActions.Update) => action.payload)
    .mergeMap(actor => this.actorsService.update(actor));

  @Effect({ dispatch: false })
  delete = this.actions.ofType(ActorActions.DELETE)
    .map((action: ActorActions.Delete) => action.payload)
    .mergeMap(id => this.actorsService.delete(id));
}
