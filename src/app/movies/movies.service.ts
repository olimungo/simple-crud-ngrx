import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { switchMap, mergeMap } from 'rxjs/operators';
import * as uuid from 'uuid';

import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/do';

import { environment } from '../../environments/environment';

import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  private targetCreate: any;
  private targetRetrieve: any;
  private targetUpdate: any;
  private targetDelete: any;

  constructor(private http: Http) {
    if (environment.production) {
      this.targetCreate = this.createFirebase;
      this.targetRetrieve = this.retrieveFirebase;
      this.targetUpdate = this.updateFirebase;
      this.targetDelete = this.deleteFirebase;
    } else {
      this.targetCreate = this.createLocal;
      this.targetRetrieve = this.retrieveLocal;
      this.targetUpdate = this.updateLocal;
      this.targetDelete = this.deleteLocal;
    }
  }

  create(movie: Movie): Observable<any> {
    return this.targetCreate(movie);
  }

  retrieve(): Observable<Movie[]> {
    return this.targetRetrieve();
  }

  update(movie: Movie): Observable<any> {
    return this.targetUpdate(movie);
  }

  delete(id: string): Observable<any> {
    return this.targetDelete(id);
  }

  createLocal(movie: Movie) {
    const newMovie = { ...movie, id: uuid() };

    return this.http.post(`${environment.backEnd}/movies`, newMovie).map(() => newMovie);
  }

  createFirebase(movie: Movie) {
    return this.http.post(`${environment.backEnd}/movies.json`,
      JSON.stringify({ title: movie.title, genre: movie.genre, year: movie.year, director: movie.director }))
      .map(result => result.json())
      .map(result => ({ ...movie, id: result.name }));
  }

  retrieveLocal(): Observable<Movie[]> {
    return this.http.get(`${environment.backEnd}/movies`)
      // .delay(1000)
      .map(movies => movies.json())
      .concatAll()
      .mergeMap(movie => this.http.get(`${environment.backEnd}/movies-actors/${movie.id}`)
        .map(movieActors => movieActors.json().actors)
        .concatAll()
        .mergeMap(actorId => this.http.get(`${environment.backEnd}/actors/${actorId}`)
          .map(actor => actor.json()))
        .reduce((actors, actor) => ([...actors, actor]), [])
        .map(actors => ({ ...movie, actors })))
      .reduce((movies, movie) => ([...movies, movie]), []);
  }

  retrieveFirebase(): Observable<Movie[]> {
    return this.http.get(`${environment.backEnd}/movies.json`)
      .delay(1000)
      .map(movies => movies.json())
      .map(movies => {
        const moviesArray = [];

        for (const key in movies) {
          if (movies.hasOwnProperty(key)) {
            moviesArray.push(<Movie>{
              id: key, title: movies[key].title, genre: movies[key].genre, year: movies[key].year, director: movies[key].director
            });
          }
        }

        return moviesArray;
      });
  }

  updateLocal(movie: Movie) {
    return this.http.put(`${environment.backEnd}/movies/${movie.id}`,
      { title: movie.title, genre: movie.genre, year: movie.year, director: movie.director });
  }

  updateFirebase(movie: Movie) {
    return this.http.patch(`${environment.backEnd}/movies/${movie.id}.json`,
      JSON.stringify({ title: movie.title, genre: movie.genre, year: movie.year, director: movie.director }));
  }

  deleteLocal(id: string) {
    return this.http.delete(`${environment.backEnd}/movies/${id}`);
  }

  deleteFirebase(id: string) {
    return this.http.delete(`${environment.backEnd}/movies/${id}.json`);
  }
}
