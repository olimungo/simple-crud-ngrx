import {
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';

import { AutocompleteItem } from '../../shared/autocomplete/autocomplete-item.entity';

import { Actions, Reducer, State } from '../state';
import { Movie } from '../../core/models';

@Component({
  selector: 'feat-movies-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MoviesListComponent implements OnDestroy, AfterViewInit {
  @ViewChild('scroll') scroll: ElementRef;

  movies: Observable<Movie[]>;
  loading: Observable<boolean>;
  pattern = '';

  private scrollSubscription: Subscription;

  constructor(private router: Router, private store: Store<State>) {
    this.movies = this.store.select(Reducer.getMovies);
    this.loading = this.store.select(Reducer.getLoading);

    this.store
      .select(Reducer.getFilterPattern)
      .take(1)
      .subscribe(pattern => {
        this.pattern = pattern;
      });
  }

  ngAfterViewInit() {
    this.store
      .select(Reducer.getScrollPosition)
      .take(1)
      .subscribe(position => {
        this.scroll.nativeElement.scrollTop = position;
      });

    this.scrollSubscription = Observable.fromEvent(
      this.scroll.nativeElement,
      'scroll'
    )
      .debounceTime(500)
      .subscribe(event => {
        this.store.dispatch(
          new Actions.SaveScrollPosition(this.scroll.nativeElement.scrollTop)
        );
      });
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  edit(id: string) {
    this.router.navigate(['movies', id]);
  }

  add() {
    this.router.navigate(['movies/add']);
  }

  patternChange(pattern: string) {
    this.store.dispatch(new Actions.Filter(pattern));
  }
}
