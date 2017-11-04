import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import { User } from '../user.entity';

import * as UsersActions from '../users.actions';
import * as UsersReducer from '../users.reducer';

@Component({
  selector: 'feat-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Observable<User[]>;
  loading: Observable<boolean>;
  pattern = '';

  constructor(private router: Router, private store: Store<UsersReducer.State>) {
    this.store.dispatch(new UsersActions.GetList());
    this.users = this.store.select(UsersReducer.getUsers);
    this.loading = this.store.select(UsersReducer.getLoading);

    this.store.select(UsersReducer.getFilterPattern).subscribe(pattern => {
      this.pattern = pattern;
    });
  }

  ngOnInit() {
  }

  edit(id: string) {
    this.router.navigate(['users', id]);
  }

  add() {
    this.router.navigate(['users/add']);
  }

  patternChange(pattern: string) {
    this.store.dispatch(new UsersActions.Filter(pattern));
  }
}
