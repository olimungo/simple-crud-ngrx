import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';

import { User } from '../user.entity';

import * as UsersActions from '../users.actions';
import * as UsersReducer from '../users.reducer';

@Component({
  selector: 'feat-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UsersListComponent implements OnDestroy, AfterViewInit {
  @ViewChild('scroll') scroll: ElementRef;

  users: Observable<User[]>;
  loading: Observable<boolean>;
  pattern = '';

  private scrollSubscription: Subscription;

  constructor(private router: Router, private store: Store<UsersReducer.State>) {
    this.store.dispatch(new UsersActions.GetList());
    this.users = this.store.select(UsersReducer.getUsers);
    this.loading = this.store.select(UsersReducer.getLoading);

    this.store.select(UsersReducer.getFilterPattern).take(1).subscribe(pattern => {
      this.pattern = pattern;
    });
  }

  ngAfterViewInit() {
    this.store.select(UsersReducer.getScrollPosition).take(1).subscribe(position => {
      this.scroll.nativeElement.scrollTop = position;
    });

    this.scrollSubscription = Observable.fromEvent(this.scroll.nativeElement, 'scroll').debounceTime(500)
      .subscribe(event => {
        this.store.dispatch(new UsersActions.SaveScrollPosition(this.scroll.nativeElement.scrollTop));
      });
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
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
