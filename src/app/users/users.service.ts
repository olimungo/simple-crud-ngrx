import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as uuid from 'uuid';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/delay';

import { User } from './user.entity';


@Injectable()
export class UsersService {
  private targetCreate: any;
  private targetRetrieve: any;
  private targetUpdate: any;
  private targetDelete: any;

  constructor(private http: Http) {
    if (environment.production) {
      this.targetCreate = this.createFirebase;
      this.targetRetrieve = this.retrieveFirebase;
      this.targetUpdate = this.updateFirebase;
      this.targetDelete = this.deleteFirebase;
    } else {
      this.targetCreate = this.createLocal;
      this.targetRetrieve = this.retrieveLocal;
      this.targetUpdate = this.updateLocal;
      this.targetDelete = this.deleteLocal;
    }
  }

  create(user: User): Observable<any> {
    return this.targetCreate(user);
  }

  retrieve(): Observable<User[]> {
    return this.targetRetrieve();
  }

  update(user: User): Observable<any> {
    return this.targetUpdate(user);
  }

  delete(id: string): Observable<any> {
    return this.targetDelete(id);
  }

  createLocal(user: User) {
    const newUser = { ...user, id: uuid() };

    return this.http.post(`${environment.backEnd}/users`, newUser).map(() => newUser);
  }

  createFirebase(user: User) {
    return this.http.post(`${environment.backEnd}/users.json`,
      JSON.stringify({ firstname: user.firstname, lastname: user.lastname }))
      .map(result => result.json())
      .map(result => ({ ...user, id: result.name }));
  }

  retrieveLocal(): Observable<User[]> {
    return this.http.get(`${environment.backEnd}/users`)
      .delay(1000)
      .map(users => users.json());
  }

  retrieveFirebase(): Observable<User[]> {
    return this.http.get(`${environment.backEnd}/users.json`)
      .delay(1000)
      .map(users => users.json())
      .map(users => {
        const usersArray = [];

        for (const key in users) {
          if (users.hasOwnProperty(key)) {
            usersArray.push(<User>{ id: key, firstname: users[key].firstname, lastname: users[key].lastname });
          }
        }

        return usersArray;
      });
  }

  updateLocal(user: User) {
    return this.http.put(`${environment.backEnd}/users/${user.id}`, { firstname: user.firstname, lastname: user.lastname });
  }

  updateFirebase(user: User) {
    return this.http.patch(`${environment.backEnd}/users/${user.id}.json`,
      JSON.stringify({ firstname: user.firstname, lastname: user.lastname }));
  }

  deleteLocal(id: string) {
    return this.http.delete(`${environment.backEnd}/users/${id}`);
  }

  deleteFirebase(id: string) {
    return this.http.delete(`${environment.backEnd}/users/${id}.json`);
  }
}
