import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../state';
import * as MoviesActions from './movies.actions';
import { Movie } from '../movie.entity';

export type Action = MoviesActions.All;

export interface State extends fromRoot.State {
  movies: Movie[];
  allMovies: Movie[];
  selectedMovieId: string;
  selectedMovie: Movie;
  loading: boolean;
  filterPattern: string;
  scrollPosition: number;
}

const defaultState: State = {
  movies: null,
  allMovies: null,
  selectedMovieId: null,
  selectedMovie: null,
  loading: false,
  filterPattern: '',
  scrollPosition: 0
};

export function reducer(state: State = defaultState, action: MoviesActions.All) {
  switch (action.type) {
    case MoviesActions.SET_URL:
      return { ...state, url: action.payload };
    case MoviesActions.GET_LIST_FORCED:
      return { ...state, loading: true };
    case MoviesActions.LIST_RETRIEVED:
      const movies = sortMovies(action.payload);

      return {
        ...state, movies: movies, allMovies: movies, loading: false,
        selectedMovie: getMovie(movies, state.selectedMovieId), selectedMovieId: null
      };
    case MoviesActions.ADD:
      return { ...state, selectedMovie: <Movie>{} };
    case MoviesActions.EDIT:
      return {
        ...state, selectedMovie: getMovie(state.allMovies, action.payload),
        selectedMovieId: geSelectedMovieId(state.allMovies, action.payload)
      };
    case MoviesActions.CREATE:
      return {
        ...state, selectedMovie: null, movies: addMovie(state.movies, action.payload), allMovies: addMovie(state.allMovies, action.payload)
      };
    case MoviesActions.UPDATE:
      return {
        ...state, movies: updateMovie(state.movies, action.payload), allMovies: updateMovie(state.allMovies, action.payload),
        selectedMovie: null
      };
    case MoviesActions.CANCEL:
      return { ...state, selectedMovie: null };
    case MoviesActions.DELETE:
      return {
        ...state, selectedMovie: null, movies: deleteMovie(state.movies, action.payload),
        allMovies: deleteMovie(state.allMovies, action.payload)
      };
    case MoviesActions.FILTER:
      return { ...state, filterPattern: action.payload, movies: filterMovies(state.allMovies, action.payload) };
    case MoviesActions.SAVE_SCROLL_POSITION:
      return { ...state, scrollPosition: action.payload };
    default:
      return state;
  }
}

const geSelectedMovieId = (movies: Movie[], id: string) => {
  return movies ? null : id;
};

const getMovie = (movies: Movie[], id: string) => {
  return movies ? movies.find(movie => movie.id === id) : null;
};

const addMovie = (movies: Movie[], movie: Movie) => {
  return ([...movies, movie]).sort(compareMovies);
};

const updateMovie = (movies: Movie[], movie: Movie) => {
  return addMovie(deleteMovie(movies, movie.id), movie);
};

const deleteMovie = (movies: Movie[], id: string) => {
  const index = movies.findIndex(movie => movie.id === id);
  return movies.slice(0, index).concat(movies.slice(index + 1));
};

const filterMovies = (movies: Movie[], pattern: string) => {
  return movies.filter(movie => {
    const fullString = (movie.title + ' ' + movie.genre + ' ' + movie.year + ' ' + movie.director).toUpperCase();
    return fullString.indexOf(pattern.toUpperCase()) > -1;
  });
};

const sortMovies = (movies: Movie[]) => {
  return [...movies].sort(compareMovies);
};

const compareMovies = (a: Movie, b: Movie) => {
  return a.title > b.title ? 1 : -1;
};

export const selectMovies = createFeatureSelector<State>('movies');

export const getMovies = createSelector(selectMovies, (state: State) => state.movies);
export const getMoviesCount = createSelector(selectMovies, (state: State) => state.allMovies ? state.allMovies.length.toString() : '');
export const getSelectedMovie = createSelector(selectMovies, (state: State) => state.selectedMovie);
export const getLoading = createSelector(selectMovies, (state: State) => state.loading);
export const getFilterPattern = createSelector(selectMovies, (state: State) => state.filterPattern);
export const getScrollPosition = createSelector(selectMovies, (state: State) => state.scrollPosition);
