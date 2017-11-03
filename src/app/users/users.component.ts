import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';

import * as UsersActions from './users.actions';
import * as UsersReducer from './users.reducer';

import { User } from './user.entity';

@Component({
  selector: 'feat-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  selectedUser: Observable<User>;
  loading: Observable<boolean>;

  constructor(private route: ActivatedRoute, private location: Location, private store: Store<UsersReducer.State>) {
  }

  ngOnInit() {
    this.users = this.store.select(UsersReducer.getUsers);
    this.selectedUser = this.store.select(UsersReducer.getSelectedUser);
    this.loading = this.store.select(UsersReducer.getLoading);
    this.store.dispatch(new UsersActions.SetUrl(this.location.path()));

    this.store.select(UsersReducer.getUrl).subscribe(url => this.location.go(url));
    this.store.dispatch(new UsersActions.GetList());

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new UsersActions.Edit(params['id']));
      }
    });
  }

  edit(id: string) {
    this.store.dispatch(new UsersActions.Edit(id));
  }

  save(user: User) {
    if (user.id) {
      this.store.dispatch(new UsersActions.Update(user));
    } else {
      this.store.dispatch(new UsersActions.Create(user));
    }
  }

  cancel() {
    this.store.dispatch(new UsersActions.Cancel());
  }

  delete(id: string) {
    this.store.dispatch(new UsersActions.Delete(id));
  }

  add() {
    this.store.dispatch(new UsersActions.Add());
  }
}
