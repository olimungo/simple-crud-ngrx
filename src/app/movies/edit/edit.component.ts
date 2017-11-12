import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/take';

import { Movie } from '../movie.entity';

import * as MoviesActions from '../state/movies.actions';
import * as MoviesReducer from '../state/movies.reducer';
import { AutocompleteItem } from '../../shared/autocomplete/autocomplete-item.entity';
import { allGenres } from '../all-genres.values';
import { Actor } from '../../actors/actor.entity';

@Component({
  selector: 'feat-movie-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class MovieEditComponent implements OnInit, OnDestroy {
  id: string;
  title: string;
  genres: string[];
  genresForAutocomplete: AutocompleteItem[];
  year: number;
  director: string;
  actors: Actor[];
  actorsForAutocomplete: AutocompleteItem[];

  loading: Observable<boolean>;
  pattern = '';

  private movieSubscrition: Subscription;
  private actorsSubscrition: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<MoviesReducer.State>) {
    this.loading = this.store.select(MoviesReducer.getLoading);

    this.movieSubscrition = this.store.select(MoviesReducer.getSelectedMovie).subscribe(movie => {
      this.id = null;
      this.title = null;
      this.genres = [];
      this.year = null;
      this.director = null;
      this.actors = [];
      this.actorsForAutocomplete = [];
      this.genresForAutocomplete = [];

      if (movie) {
        this.id = movie.id;
        this.title = movie.title;
        this.genres = movie.genres;
        this.year = movie.year;
        this.director = movie.director;
        this.actors = movie.actors;

        this.genresForAutocomplete = allGenres
          .filter(allGenre => !movie.genres.some(genre => genre === allGenre))
          .sort((a, b) => a > b ? 1 : -1)
          .map(genre => ({ value: genre, data: genre }));

        this.actorsSubscrition = this.store.select(MoviesReducer.getAllActors)
          .subscribe(actors => this.actorsForAutocomplete = actors
            .filter(actor => !this.actors.some(a => a.id === actor.id))
            .sort((a, b) => a.firstname + ' ' + a.lastname > b.firstname + ' ' + b.lastname ? 1 : -1)
            .map(actor => ({ value: actor.firstname + ' ' + actor.lastname, data: actor }))
          );
      }
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
    this.actorsSubscrition.unsubscribe();
  }

  save() {
    const movie: Movie = {
      id: this.id, title: this.title, genres: this.genres, year: this.year,
      director: this.director, actors: this.actors };

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

  addGenre(genre: string) {
    const index = this.genresForAutocomplete.findIndex(g => g.value === genre);
    this.genresForAutocomplete = this.genresForAutocomplete.slice(0, index).concat(this.genresForAutocomplete.slice(index + 1));
    this.genres = [...this.genres, genre].sort((a, b) => a > b ? 1 : -1);
  }

  removeGenre(id: string) {
    const index = this.genres.findIndex(genre => genre === id);
    this.genres = this.genres.slice(0, index).concat(this.genres.slice(index + 1));
    this.genresForAutocomplete = [...this.genresForAutocomplete, { value: id, data: id }].sort((a, b) => a.value > b.value ? 1 : -1);
  }

  addActor(actor: Actor) {
    const index = this.actorsForAutocomplete.findIndex(g => g.data.id === actor.id);
    this.actorsForAutocomplete = this.actorsForAutocomplete.slice(0, index).concat(this.actorsForAutocomplete.slice(index + 1));
    this.actors = [...this.actors, actor].sort((a, b) => a.firstname + ' ' + a.lastname > b.firstname + ' ' + b.lastname ? 1 : -1);
  }

  removeActor(actor: Actor) {
    const index = this.actors.findIndex(a => a.id === actor.id);
    this.actors = this.actors.slice(0, index).concat(this.actors.slice(index + 1));
    this.actorsForAutocomplete = [...this.actorsForAutocomplete, { value: actor.firstname + ' ' + actor.lastname, data: actor }]
      .sort((a, b) => a.value > b.value ? 1 : -1);
  }
}
