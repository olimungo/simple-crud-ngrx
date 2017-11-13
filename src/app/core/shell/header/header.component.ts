import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromActors from '../../../actors/state';
import * as fromMovies from '../../../movies/state';
import * as fromActorsReducer from '../../../actors/state/actors.reducer';
import * as fromMoviesReducer from '../../../movies/state/movies.reducer';

@Component({
  selector: 'core-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ShellHeaderComponent implements OnInit {
  moviesCount: Observable<number>;
  actorsCount: Observable<number>;

  constructor(private router: Router, private actorsStore: Store<fromActors.State>, private moviesStore: Store<fromMovies.State>) {
    this.actorsCount = this.actorsStore.select(fromActorsReducer.getActorsCount);
    this.moviesCount = this.moviesStore.select(fromMoviesReducer.getMoviesCount);
  }

  ngOnInit() {
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
