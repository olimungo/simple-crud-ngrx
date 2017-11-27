import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ActorsService } from '../../actors.service';

import * as ActorActions from './list.actions';
export type Action = ActorActions.All;

@Injectable()
export class Effects {
  private actorsLoaded = false;

  constructor(private actions: Actions, private http: Http, private actorsService: ActorsService) { }

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
}
