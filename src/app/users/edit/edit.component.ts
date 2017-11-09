import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import { User } from '../user.entity';

import * as UsersActions from '../state/users.actions';
import * as UsersReducer from '../state/users.reducer';

@Component({
  selector: 'feat-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  id: string;
  firstname: string;
  lastname: string;

  private userSubscrition: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<UsersReducer.State>) {
    this.userSubscrition = this.store.select(UsersReducer.getSelectedUser).subscribe(user => {
      this.id = user ? user.id : null;
      this.firstname = user ? user.firstname : null;
      this.lastname = user ? user.lastname : null;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new UsersActions.Edit(params['id']));
      } else {
        this.store.dispatch(new UsersActions.Add());
      }
    });
  }

  ngOnDestroy() {
    this.userSubscrition.unsubscribe();
  }

  save() {
    const user: User = { id: this.id, firstname: this.firstname, lastname: this.lastname };

    if (this.id) {
      this.store.dispatch(new UsersActions.Update(user));
    } else {
      this.store.dispatch(new UsersActions.Create(user));
    }

    this.backToList();
  }

  cancel() {
    this.store.dispatch(new UsersActions.Cancel());
    this.backToList();
  }

  delete() {
    this.store.dispatch(new UsersActions.Delete(this.id));
    this.backToList();
  }

  backToList() {
    this.router.navigate(['users']);
  }
}
