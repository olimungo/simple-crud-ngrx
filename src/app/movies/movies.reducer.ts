import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as MoviesActions from './movies.actions';
import { Movie } from './movie.entity';

export type Action = MoviesActions.All;

export interface State {
  movies: Movie[];
  selectedMovieId: string;
  selectedMovie: Movie;
  loading: boolean;
  url: string;
}

const defaultState: State = {
  movies: [],
  selectedMovieId: null,
  selectedMovie: null,
  loading: false,
  url: null
};

export function moviesReducer(state: State = defaultState, action: MoviesActions.All) {
  let movie: Movie = null;

  switch (action.type) {
    case MoviesActions.SET_URL:
      return { ...state, url: action.payload };
    case MoviesActions.GET_LIST:
      return { ...state, loading: true };
    case MoviesActions.LIST_RETRIEVED:
      if (state.selectedMovieId) {
        movie = action.payload.find(u => u.id === state.selectedMovieId);
      }

      return { ...state, movies: action.payload, loading: false, selectedMovie: movie, selectedMovieId: null };
    case MoviesActions.ADD:
      return { ...state, selectedMovie: <Movie>{} };
    case MoviesActions.EDIT:
      let selectedMovieId = null;
      movie = state.movies.find(u => u.id === action.payload);

      if (!movie) {
        selectedMovieId = action.payload;
        movie = null;
      }

      return { ...state, selectedMovie: movie, url: addIdToUrl(state.url, action.payload), selectedMovieId: selectedMovieId };
    case MoviesActions.CREATE:
      return {
        ...state, selectedMovie: null, movies: addMovie(state.movies, action.payload),
        url: removeIdFromUrl(state.url, state.selectedMovie.id)
      };
    case MoviesActions.UPDATE:
      return { ...state, selectedMovie: null, url: removeIdFromUrl(state.url, state.selectedMovie.id) };
    case MoviesActions.CANCEL:
      return { ...state, selectedMovie: null, url: removeIdFromUrl(state.url, state.selectedMovie.id) };
    case MoviesActions.DELETE:
      return {
        ...state, selectedMovie: null, movies: deleteMovie(state.movies, action.payload),
        url: removeIdFromUrl(state.url, state.selectedMovie.id)
      };
    default:
      return state;
  }
}

const getMovie = (movies: Movie[], id: string) => {
  return movies.find(movie => movie.id === id);
};

const addMovie = (movies: Movie[], movie: Movie) => {
  const newMovies = <Movie[]>[];
  let movieInserted = false;

  movies.forEach(u => {
    if (u.title > movie.title && !movieInserted) {
      movieInserted = true;
      newMovies.push(movie);
    }

    newMovies.push(u);
  });

  return newMovies;
};

const deleteMovie = (movies: Movie[], id: string) => {
  const newMovies = <Movie[]>[];

  movies.forEach(u => {
    if (u.id !== id) {
      newMovies.push(u);
    }
  });

  return newMovies;
};

const addIdToUrl = (url: string, id: string) => {
  if (url.indexOf(`/${id}`) > -1) {
    return url;
  }

  return `${url}/${id}`;
};

const removeIdFromUrl = (url: string, id: string) => {
  return url.replace(`/${id}`, '');
};

export const selectMovies = createFeatureSelector<State>('movies');

export const getMovies = createSelector(selectMovies, (state: State) => state.movies);
export const getSelectedMovie = createSelector(selectMovies, (state: State) => state.selectedMovie);
export const getLoading = createSelector(selectMovies, (state: State) => state.loading);
export const getUrl = createSelector(selectMovies, (state: State) => state.url);

