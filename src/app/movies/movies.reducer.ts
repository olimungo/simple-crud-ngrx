import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as MoviesActions from './movies.actions';
import { Movie } from './movie.entity';

export type Action = MoviesActions.All;

export interface State {
  movies: Movie[];
  allMovies: Movie[];
  selectedMovieId: string;
  selectedMovie: Movie;
  loading: boolean;
  url: string;
}

const defaultState: State = {
  movies: null,
  allMovies: null,
  selectedMovieId: null,
  selectedMovie: null,
  loading: false,
  url: null
};

export function moviesReducer(state: State = defaultState, action: MoviesActions.All) {
  switch (action.type) {
    case MoviesActions.SET_URL:
      return { ...state, url: action.payload };
    case MoviesActions.GET_LIST_FORCED:
      return { ...state, loading: true };
    case MoviesActions.LIST_RETRIEVED:
      const movies = (action.payload).sort(sortMovies);

      return {
        ...state, movies: movies, allMovies: movies, loading: false,
        selectedMovie: getMovie(movies, state.selectedMovieId), selectedMovieId: null
      };
    case MoviesActions.ADD:
      return { ...state, selectedMovie: <Movie>{} };
    case MoviesActions.EDIT:
      return {
        ...state, selectedMovie: getMovie(state.allMovies, action.payload), url: addIdToUrl(state.url, action.payload),
        selectedMovieId: geSelectedMovieId(state.allMovies, action.payload)
      };
    case MoviesActions.CREATE:
      return {
        ...state, selectedMovie: null, movies: addMovie(state.movies, action.payload), allMovies: addMovie(state.allMovies, action.payload),
        url: removeIdFromUrl(state.url, state.selectedMovie.id)
      };
    case MoviesActions.UPDATE:
      return {
        ...state, movies: updateMovie(state.movies, action.payload), allMovies: updateMovie(state.allMovies, action.payload),
        selectedMovie: null, url: removeIdFromUrl(state.url, state.selectedMovie.id)
      };
    case MoviesActions.CANCEL:
      return { ...state, selectedMovie: null, url: removeIdFromUrl(state.url, state.selectedMovie.id) };
    case MoviesActions.DELETE:
      return {
        ...state, selectedMovie: null, movies: deleteMovie(state.movies, action.payload),
        allMovies: deleteMovie(state.allMovies, action.payload), url: removeIdFromUrl(state.url, state.selectedMovie.id)
      };
    case MoviesActions.FILTER:
      return { ...state, movies: filterMovies(state.allMovies, action.payload) };
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
  return ([...movies, movie]).sort(sortMovies);
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

const sortMovies = (a: Movie, b: Movie) => {
  return a.title > b.title ? 1 : -1;
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
export const getMoviesCount = createSelector(selectMovies, (state: State) => state.allMovies ? state.allMovies.length.toString() : '');
export const getSelectedMovie = createSelector(selectMovies, (state: State) => state.selectedMovie);
export const getLoading = createSelector(selectMovies, (state: State) => state.loading);
export const getUrl = createSelector(selectMovies, (state: State) => state.url);

