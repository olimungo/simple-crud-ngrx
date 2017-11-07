import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private http: Http) { }

  create(user: User): Observable<any> {
    const id = new Date().getTime().toString();
    const newUser = { ...user, id };

    return this.http.post(`${environment.backEnd}/users`, newUser).map(() => newUser);
  }

  retrieve(): Observable<any> {
    return this.http.get(`${environment.backEnd}/users`).map(users => users.json());
  }

  update(user: User): Observable<any> {
    return this.http.put(`${environment.backEnd}/users/${user.id}`, user);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.backEnd}/users/${id}`);
  }
}
