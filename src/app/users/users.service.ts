import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  list(): Observable<User[]> {
    return this.http.get(`${environment.backEnd}/users`)
      .map(result => result.json())
      .do((result: User[]) => result.sort((a, b) => {
        return a.lastname + a.firstname > b.lastname + b.firstname ? 1 : -1;
      } ));
  }

  get(id: string): Observable<User> {
    return this.http.get(`${environment.backEnd}/users/${id}`)
      .take(1)
      .map(result => result.json());
  }

  save(user: User) {
    return this.http.put(`${environment.backEnd}/users/${user.id}`, user);
  }

  delete(id: string) {
    return this.http.delete(`${environment.backEnd}/users/${id}`);
  }

  add(user: User) {
    user.id = new Date().getTime().toString();
    return this.http.post(`${environment.backEnd}/users`, user);
  }

}
