import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';

import * as ActorsActions from '../state/actors.actions';
import * as ActorsReducer from '../state/actors.reducer';
import { Actor } from '../../core/models';

@Component({
  selector: 'feat-actors-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ActorsListComponent implements OnDestroy, AfterViewInit {
  @ViewChild('scroll') scroll: ElementRef;

  actors: Observable<Actor[]>;
  loading: Observable<boolean>;
  pattern = '';

  private scrollSubscription: Subscription;

  constructor(private router: Router, private store: Store<ActorsReducer.State>) {
    this.actors = this.store.select(ActorsReducer.getActors);
    this.loading = this.store.select(ActorsReducer.getLoading);

    this.store.select(ActorsReducer.getFilterPattern).take(1).subscribe(pattern => {
      this.pattern = pattern;
    });
  }

  ngAfterViewInit() {
    this.store.select(ActorsReducer.getScrollPosition).take(1).subscribe(position => {
      this.scroll.nativeElement.scrollTop = position;
    });

    this.scrollSubscription = Observable.fromEvent(this.scroll.nativeElement, 'scroll').debounceTime(500)
      .subscribe(event => {
        this.store.dispatch(new ActorsActions.SaveScrollPosition(this.scroll.nativeElement.scrollTop));
      });
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  edit(id: string) {
    this.router.navigate(['actors', id]);
  }

  add() {
    this.router.navigate(['actors/add']);
  }

  patternChange(pattern: string) {
    this.store.dispatch(new ActorsActions.Filter(pattern));
  }
}
