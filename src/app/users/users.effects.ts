import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Effect, Actions } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';

import { User } from './user.entity';
import * as userActions from './users.actions';
export type Action = userActions.All;

@Injectable()
export class UsersEffects {
  private usersLoaded = false;

  constructor(private actions: Actions, private http: Http) { }

  @Effect()
  create: Observable<Action> = this.actions.ofType(userActions.CREATE)
    .map((action: userActions.Create) => action.payload)
    .mergeMap(user => {
      user.id = new Date().getTime().toString();
      return this.http.post(`${environment.backEnd}/users`, user);
    })
    .map(() => new userActions.NoAction());

  @Effect()
  retrieve: Observable<Action> = this.actions.ofType(userActions.GET_LIST)
    .map(() => {
      if (!this.usersLoaded) {
        return new userActions.GetListForced();
      } else {
        return new userActions.NoAction();
      }
    });

  @Effect()
  retrieveForced: Observable<Action> = this.actions.ofType(userActions.GET_LIST_FORCED)
    .mergeMap(() => this.http.get(`${environment.backEnd}/users`))
    .delay(1000)
    .map(users => users.json())
    .map(users => {
      this.usersLoaded = true;
      return new userActions.ListRetrieved(users);
    });

  @Effect()
  update: Observable<Action> = this.actions.ofType(userActions.UPDATE)
    .map((action: userActions.Update) => action.payload)
    .mergeMap(user => {
      return this.http.put(`${environment.backEnd}/users/${user.id}`, user);
    })
    .map(() => new userActions.NoAction());

  @Effect()
  delete = this.actions.ofType(userActions.DELETE)
    .map((action: userActions.Delete) => action.payload)
    .mergeMap(id => {
      return this.http.delete(`${environment.backEnd}/users/${id}`);
    })
    .map(() => new userActions.NoAction());
}
