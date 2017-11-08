import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { UsersService } from '../users.service';

import * as UserActions from './users.actions';
export type Action = UserActions.All;

@Injectable()
export class Effects {
  private usersLoaded = false;

  constructor(private actions: Actions, private http: Http, private usersService: UsersService) { }

  @Effect()
  create: Observable<Action> = this.actions.ofType(UserActions.CREATE)
    .map((action: UserActions.Create) => action.payload)
    .mergeMap(user => this.usersService.create(user))
    .map(user => new UserActions.CreateDone(user));

  @Effect()
  retrieve: Observable<Action> = this.actions.ofType(UserActions.GET_LIST)
    .map(() => {
      if (!this.usersLoaded) {
        return new UserActions.GetListForced();
      } else {
        return new UserActions.NoAction();
      }
    });

  @Effect()
  retrieveForced: Observable<Action> = this.actions.ofType(UserActions.GET_LIST_FORCED)
    .mergeMap(() => this.usersService.retrieve())
    .map(users => {
      this.usersLoaded = true;
      return new UserActions.ListRetrieved(users);
    });

  @Effect({ dispatch: false })
  update: Observable<Action> = this.actions.ofType(UserActions.UPDATE)
    .map((action: UserActions.Update) => action.payload)
    .mergeMap(user => this.usersService.update(user));

  @Effect({ dispatch: false })
  delete = this.actions.ofType(UserActions.DELETE)
    .map((action: UserActions.Delete) => action.payload)
    .mergeMap(id => this.usersService.delete(id));
}
