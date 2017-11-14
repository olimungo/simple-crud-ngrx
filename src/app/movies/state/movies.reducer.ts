import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as MoviesActions from './movies.actions';
import { Movie, Actor } from '../../core/models';

export interface State {
  allActors: Actor[];
  allMovies: Movie[];
  movies: Movie[];
  selectedMovieId: string;
  selectedMovie: Movie;
  loadingMovies: boolean;
  loadingActors: boolean;
  filterPattern: string;
  scrollPosition: number;
}

const defaultState: State = {
  allActors: [],
  allMovies: [],
  movies: [],
  selectedMovieId: null,
  selectedMovie: null,
  loadingMovies: false,
  loadingActors: false,
  filterPattern: '',
  scrollPosition: 0
};

export function reducer(state: State = defaultState, action: MoviesActions.All) {
  switch (action.type) {
    case MoviesActions.GET_LIST_FORCED:
      return { ...state, loadingMovies: true, loadingActors: true };
    case MoviesActions.LIST_RETRIEVED:
      const movies = sortMovies(action.payload);

      return {
        ...state, movies, allMovies: movies, loadingMovies: false,
        selectedMovie: getMovie(movies, state.selectedMovieId), selectedMovieId: null
      };
    case MoviesActions.LIST_ACTORS_RETRIEVED:
      const actors = sortActors(action.payload);

      return { ...state, actors, allActors: actors, loadingActors: false };
    case MoviesActions.ADD:
      return { ...state, selectedMovie: <Movie>{ genres: [], actors: [] } };
    case MoviesActions.EDIT:
      return {
        ...state, selectedMovie: getMovie(state.allMovies, action.payload),
        selectedMovieId: state.allMovies.length > 0 ? null : action.payload
      };
    case MoviesActions.CREATE:
      // Nothing to change to the store at this point. An effect CREATE is also triggered and will subsequently fire a CREATE_DONE action.
      return state;
    case MoviesActions.CREATE_DONE:
      return {
        ...state, movies: addMovie(state.movies, action.payload), allMovies: addMovie(state.allMovies, action.payload)
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
    const fullString = (movie.title + ' ' + ' ' + movie.year + ' ' + movie.director + ' ' + movie.genres.join(' ') +
      movie.actors.map(actor => actor.fullname).join(' '))
      .toUpperCase();

    return fullString.indexOf(pattern.toUpperCase()) > -1;
  });
};

const sortMovies = (movies: Movie[]) => {
  return [...movies].sort(compareMovies);
};

const sortActors = (actors: Actor[]) => {
  return [...actors].sort(compareActors);
};

const compareMovies = (a: Movie, b: Movie) => {
  return a.title > b.title ? 1 : -1;
};

const compareActors = (a: Actor, b: Actor) => {
  return a.fullname > b.fullname ? 1 : -1;
};

export const selectMovies = createFeatureSelector<State>('movies');

export const getMovies = createSelector(selectMovies, (state: State) => state.movies);
export const getMoviesCount = createSelector(selectMovies, (state: State) => state.allMovies ? state.allMovies.length : 0);
export const getSelectedMovie = createSelector(selectMovies, (state: State) => state.selectedMovie);
export const getLoading = createSelector(selectMovies, (state: State) => state.loadingMovies || state.loadingActors);
export const getFilterPattern = createSelector(selectMovies, (state: State) => state.filterPattern);
export const getScrollPosition = createSelector(selectMovies, (state: State) => state.scrollPosition);
export const getAllActors = createSelector(selectMovies, (state: State) => state.allActors);

