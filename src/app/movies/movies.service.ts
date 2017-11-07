import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(private http: Http) { }

  create(movie: Movie): Observable<any> {
    const id = new Date().getTime().toString();
    const newMovie = { ...movie, id };

    return this.http.post(`${environment.backEnd}/movies`, newMovie).map(() => newMovie);
  }

  retrieve(): Observable<any> {
    return this.http.get(`${environment.backEnd}/movies`).map(movies => movies.json());
  }

  update(movie: Movie): Observable<any> {
    return this.http.put(`${environment.backEnd}/movies/${movie.id}`, movie);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.backEnd}/movies/${id}`);
  }
}
