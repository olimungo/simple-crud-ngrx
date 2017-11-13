import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { switchMap, mergeMap, flatMap } from 'rxjs/operators';
import * as uuid from 'uuid';

import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/do';

import { environment } from '../../environments/environment';

import { Movie } from './movie.entity';
import { RetrieveResult } from './state/movies.actions';
import { Actor } from '../actors/actor.entity';

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

  retrieve(): Observable<RetrieveResult> {
    return this.targetRetrieve();
  }

  update(movie: Movie): Observable<any> {
    return this.targetUpdate(movie);
  }

  delete(id: string): Observable<any> {
    return this.targetDelete(id);
  }

  createLocal(movie: Movie) {
    const newMovie = { id: uuid(), title: movie.title, genres: movie.genres, year: movie.year, director: movie.director };
    const actors = movie.actors.map(actor => actor.id);

    return this.http.post(`${environment.backEnd}/movies`, newMovie)
      .mergeMap(() => this.http.post(`${environment.backEnd}/movies-actors`, { id: newMovie.id, actors })
        .map(() => ({ ...newMovie, actors: movie.actors })));
  }

  createFirebase(movie: Movie) {
    const newMovie = { title: movie.title, genres: movie.genres, year: movie.year, director: movie.director };
    const newActors = movie.actors.reduce((actors, actor) => ({ ...actors, [actor.id]: true }), {});

    return this.http.post(`${environment.backEnd}/movies.json`, JSON.stringify(newMovie))
      .map(result => result.json())
      .map(result => ({ ...movie, id: result.name, actors: movie.actors }))
      .mergeMap(result => this.http.patch(`${environment.backEnd}/movies-actors/${result.id}.json`, JSON.stringify(newActors))
        .map(() => result));
  }

  retrieveLocal(): Observable<RetrieveResult> {
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
      .reduce((movies, movie) => ([...movies, movie]), [])
      .mergeMap(movies => this.http.get(`${environment.backEnd}/actors`)
        .map(actors => actors.json())
        .map(actors => ({ movies, actors })));
  }

  retrieveFirebase(): Observable<RetrieveResult> {
    return this.http.get(`${environment.backEnd}/movies.json`)
      // .delay(1000)
      .map(movies => movies.json())
      .flatMap(movies => {
        const moviesArray = [];

        for (const key in movies) {
          if (movies.hasOwnProperty(key)) {
            moviesArray.push(<Movie>{
              id: key, title: movies[key].title, genres: movies[key].genres, year: movies[key].year, director: movies[key].director
            });
          }
        }

        return moviesArray;
      })
      .mergeMap(movie => this.http.get(`${environment.backEnd}/movies-actors/${movie.id}.json`)
        .map(movieActors => movieActors.json())
        .flatMap(movieActors => {
          const movieActorsArray = [];

          for (const key in movieActors) {
            if (movieActors.hasOwnProperty(key)) {
              movieActorsArray.push(key);
            }
          }

          return movieActorsArray;
        })
        .mergeMap(actorId => this.http.get(`${environment.backEnd}/actors/${actorId}.json`)
          .map(actor => actor.json())
          .map(actor => (<Actor>{ id: actorId, firstname: actor.firstname, lastname: actor.lastname })))
        .reduce((actors, actor) => ([...actors, actor]), [])
        .map(actors => ({ ...movie, actors })))
      .reduce((movies, movie) => ([...movies, movie]), [])
      .mergeMap(movies => this.http.get(`${environment.backEnd}/actors.json`)
        .map(actors => actors.json())
        .map(actors => {
          const actorsArray = [];

          for (const key in actors) {
            if (actors.hasOwnProperty(key)) {
              actorsArray.push(<Actor>{ id: key, firstname: actors[key].firstname, lastname: actors[key].lastname });
            }
          }

          return actorsArray;
        })
        .map(actors => ({ movies, actors })));
  }

  updateLocal(movie: Movie) {
    const newActors = movie.actors.map(actor => actor.id);

    return this.http.put(`${environment.backEnd}/movies/${movie.id}`,
      { title: movie.title, genres: movie.genres, year: movie.year, director: movie.director })
      .mergeMap(() => this.http.put(`${environment.backEnd}/movies-actors/${movie.id}`, { newActors }));
  }

  updateFirebase(movie: Movie) {
    const newActors = movie.actors.reduce((actors, actor) => ({ ...actors, [actor.id]: true }), {});

    return this.http.patch(`${environment.backEnd}/movies/${movie.id}.json`,
      JSON.stringify({ title: movie.title, genres: movie.genres, year: movie.year, director: movie.director }))
      .mergeMap(() => this.http.put(`${environment.backEnd}/movies-actors/${movie.id}.json`, JSON.stringify(newActors)));
  }

  deleteLocal(id: string) {
    return this.http.delete(`${environment.backEnd}/movies/${id}`)
      .mergeMap(() => this.http.delete(`${environment.backEnd}/movies-actors/${id}`));
  }

  deleteFirebase(id: string) {
    return this.http.delete(`${environment.backEnd}/movies/${id}.json`)
      .mergeMap(() => this.http.delete(`${environment.backEnd}/movies-actors/${id}.json`));
  }
}
