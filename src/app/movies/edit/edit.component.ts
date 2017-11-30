import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import { Actions, Reducer, State } from '../state';
import { AutocompleteItem } from '../../shared/autocomplete/autocomplete-item.entity';
import { Actor, Movie } from '../../core/models';

@Component({
  selector: 'feat-movie-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class MovieEditComponent implements OnInit, OnDestroy {
  // movie: Movie;

  movie: Movie = {
    id: null,
    title: null,
    genres: [],
    year: null,
    director: null,
    actors: []
  };

  genresForAutocomplete: Observable<AutocompleteItem[]>;
  actorsForAutocomplete: Observable<AutocompleteItem[]>;

  loading: Observable<boolean>;

  private movieSubscrition: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<Reducer.State>) {
    this.loading = this.store.select(Reducer.getLoading);

    // Cannot handle an HTML input field with an Observable. So, we need to subscribe to the element in the store...
    // ...and unsubscribe when component is destroyed (see ngOnDestroy)
    this.movieSubscrition = this.store.select(Reducer.getSelectedMovie)
      .subscribe(movie => {
        this.movie = { ...movie };
      });

    this.genresForAutocomplete = this.store.select(Reducer.getFilteredGenres);
    this.actorsForAutocomplete = this.store.select(Reducer.getFilteredActors);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = '';

      if (params['id']) {
        id = params['id'];
      }

      this.store.dispatch(new Actions.Edit(id));
    });
  }

  ngOnDestroy() {
    this.movieSubscrition.unsubscribe();
  }

  save() {
    if (this.movie.id) {
      this.store.dispatch(new Actions.Update(this.movie));
    } else {
      this.store.dispatch(new Actions.Create(this.movie));
    }

    this.backToList();
  }

  cancel() {
    this.store.dispatch(new Actions.Cancel());
    this.backToList();
  }

  delete() {
    this.store.dispatch(new Actions.Delete(this.movie.id));
    this.backToList();
  }

  backToList() {
    this.router.navigate(['movies']);
  }

  addGenre(genre: string) {
    this.store.dispatch(new Actions.AddGenre(genre));
  }

  removeGenre(genre: string) {
    this.store.dispatch(new Actions.RemoveGenre(genre));
  }

  addActor(actor: Actor) {
    this.store.dispatch(new Actions.AddActor(actor));
  }

  removeActor(actor: Actor) {
    this.store.dispatch(new Actions.RemoveActor(actor));
  }
}
