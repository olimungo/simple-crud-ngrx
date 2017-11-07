import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/do';

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
    return this.http.get(`${environment.backEnd}/users`)
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

  update(user: User): Observable<any> {
    return this.http.put(`${environment.backEnd}/users/${user.id}`, { firstname: user.firstname, lastname: user.lastname });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.backEnd}/users/${id}`);
  }
}
