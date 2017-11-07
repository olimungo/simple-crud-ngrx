import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private http: Http) { }

  create(user: User): Observable<any> {
    return this.http.post(`${environment.backEnd}/users`, user);
  }

  retrieve(): Observable<any> {
    return this.http.get(`${environment.backEnd}/users`);
  }

  update(user: User): Observable<any> {
    return this.http.put(`${environment.backEnd}/users/${user.id}`, user);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.backEnd}/users/${id}`);
  }
}
