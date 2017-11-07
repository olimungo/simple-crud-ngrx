import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import { Movie } from '../movie.entity';

import * as MoviesActions from '../state/movies.actions';
import * as MoviesReducer from '../state/movies.reducer';

@Component({
  selector: 'feat-movie-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class MovieEditComponent implements OnInit, OnDestroy {
  id: string;
  title: string;
  genre: string;
  year: number;
  director: string;

  private movieSubscrition: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<MoviesReducer.State>) {
    this.store.dispatch(new MoviesActions.GetList());

    this.movieSubscrition = this.store.select(MoviesReducer.getSelectedMovie).subscribe(movie => {
      this.id = movie ? movie.id : null;
      this.title = movie ? movie.title : null;
      this.genre = movie ? movie.genre : null;
      this.year = movie ? movie.year : null;
      this.director = movie ? movie.director : null;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new MoviesActions.Edit(params['id']));
      } else {
        this.store.dispatch(new MoviesActions.Add());
      }
    });
  }

  ngOnDestroy() {
    this.movieSubscrition.unsubscribe();
  }

  save() {
    const movie: Movie = { id: this.id, title: this.title, genre: this.genre, year: this.year, director: this.director };

    if (this.id) {
      this.store.dispatch(new MoviesActions.Update(movie));
    } else {
      this.store.dispatch(new MoviesActions.Create(movie));
    }

    this.backToList();
  }

  cancel() {
    this.store.dispatch(new MoviesActions.Cancel());
    this.backToList();
  }

  delete() {
    this.store.dispatch(new MoviesActions.Delete(this.id));
    this.backToList();
  }

  backToList() {
    this.router.navigate(['movies']);
  }
}
