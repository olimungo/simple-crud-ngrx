import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Reducer as ActorsReducer, State as ActorsState } from '../../../actors/state';
import { Reducer as MoviesReducer, State as MoviesState } from '../../../movies/state';

@Component({
  selector: 'core-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ShellHeaderComponent implements OnInit {
  moviesCount: Observable<number>;
  actorsCount: Observable<number>;

  constructor(private router: Router, private actorsStore: Store<ActorsState>, private moviesStore: Store<MoviesState>) {
    this.actorsCount = this.actorsStore.select(ActorsReducer.getActorsCount);
    this.moviesCount = this.moviesStore.select(MoviesReducer.getMoviesCount);
  }

  ngOnInit() {
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
