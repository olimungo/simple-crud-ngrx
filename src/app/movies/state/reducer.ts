import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AutocompleteItem } from '../../shared/autocomplete/autocomplete-item.entity';
import { Movie, Actor, allGenres } from '../../core/models';
import * as Actions from './actions';

export interface State {
  actors: Actor[];
  movies: Movie[];
  filteredMovies: Movie[];
  filteredActors: AutocompleteItem[];
  filteredGenres: AutocompleteItem[];
  selectedMovieId: string;
  selectedMovie: Movie;
  loadingMovies: boolean;
  loadingActors: boolean;
  filterPattern: string;
  scrollPosition: number;
}

const defaultState: State = {
  actors: [],
  movies: [],
  filteredMovies: [],
  filteredActors: [],
  filteredGenres: [],
  selectedMovieId: null,
  selectedMovie: null,
  loadingMovies: false,
  loadingActors: false,
  filterPattern: '',
  scrollPosition: 0
};

export function reducer(state: State = defaultState, action: Actions.All) {
  let movies: Movie[];
  let actors: Actor[];
  let selectedMovie: Movie;

  switch (action.type) {
    case Actions.GET_LIST_FORCED:
      return { ...state, loadingMovies: true, loadingActors: true };
    case Actions.LIST_RETRIEVED:
      movies = sortMovies(action.payload);

      movies = movies.map(movie => ({ ...movie, actors: sortActors(movie.actors), genres: sortGenres(movie.genres) }));

      selectedMovie = getMovie(movies, state.selectedMovieId);

      return {
        ...state, filteredMovies: movies, movies: movies, loadingMovies: false,
        selectedMovie, selectedMovieId: null,
        filteredGenres: filterGenres(movies, selectedMovie),
        filteredActors: filterActors(movies, state.actors, selectedMovie)
      };
    case Actions.LIST_ACTORS_RETRIEVED:
      actors = sortActors(action.payload);

      return {
        ...state, actors, loadingActors: false,
        filteredGenres: filterGenres(state.movies, state.selectedMovie),
        filteredActors: filterActors(state.movies, actors, state.selectedMovie),
      };
    case Actions.EDIT:
      selectedMovie = getMovie(state.movies, action.payload);

      return {
        ...state, selectedMovie,
        selectedMovieId: state.movies.length > 0 ? null : action.payload,
        filteredGenres: filterGenres(state.movies, selectedMovie),
        filteredActors: filterActors(state.movies, state.actors, selectedMovie),
      };
    case Actions.CREATE:
      // Nothing to change to the store at this point. An effect CREATE is also triggered and will subsequently fire a CREATE_DONE action.
      return state;
    case Actions.CREATE_DONE:
      return {
        ...state, filteredMovies: addMovie(state.filteredMovies, action.payload), movies: addMovie(state.movies, action.payload)
      };
    case Actions.UPDATE:
      return {
        ...state, filteredMovies: updateMovie(state.filteredMovies, action.payload),
        movies: updateMovie(state.movies, action.payload), selectedMovie: null
      };
    case Actions.CANCEL:
      return { ...state, selectedMovie: null };
    case Actions.DELETE:
      return {
        ...state, selectedMovie: null, filteredMovies: deleteMovie(state.filteredMovies, action.payload),
        movies: deleteMovie(state.movies, action.payload)
      };
    case Actions.ADD_GENRE: {
      const { addGenreMovies, addGenreFilteredGenres, addGenreMovie } =
        addGenre(state.movies, state.filteredGenres, action.payload.id, action.payload.genre);

      return { ...state, movies: addGenreMovies, filteredGenres: addGenreFilteredGenres, selectedMovie: addGenreMovie };
    }
    case Actions.REMOVE_GENRE:
      const { removeGenreMovies, removeGenreFilteredGenres, removeGenreMovie } =
        removeGenre(state.movies, state.filteredGenres, action.payload.id, action.payload.genre);

      return { ...state, movies: removeGenreMovies, filteredGenres: removeGenreFilteredGenres, selectedMovie: removeGenreMovie };
    case Actions.ADD_ACTOR: {
      const { addActorMovies, addActorFilteredActors, addActorMovie } =
        addActor(state.movies, state.actors, state.filteredActors, action.payload.id, action.payload.actor);

      return { ...state, movies: addActorMovies, filteredGenres: addActorFilteredActors, selectedMovie: addActorMovie };
    }
    case Actions.REMOVE_ACTOR:
      const { removeActorMovies, removeActorFilteredActors, removeActorMovie } =
        removeActor(state.movies, state.actors, state.filteredActors, action.payload.id, action.payload.actor);

      return { ...state, movies: removeActorMovies, filteredActors: removeActorFilteredActors, selectedMovie: removeActorMovie };
    case Actions.FILTER:
      return { ...state, filterPattern: action.payload, filteredMovies: filterMovies(state.movies, action.payload) };
    case Actions.SAVE_SCROLL_POSITION:
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

const addGenre = (movies: Movie[], filteredGenres: AutocompleteItem[], id: string, genre: string) => {
  let addGenreMovies = movies;
  let addGenreFilteredGenres = filteredGenres;
  const addGenreMovie = { ...movies.find(m => m.id === id) };
  const index = filteredGenres.findIndex(g => g.value === genre);

  if (!addGenreMovie || index === -1) {
    return { addGenreMovies, addGenreFilteredGenres, addGenreMovie };
  }

  addGenreMovie.genres = [...addGenreMovie.genres, genre].sort(compareGenres);
  addGenreFilteredGenres = filterGenres(addGenreMovies, addGenreMovie);
  addGenreMovies = updateMovie(movies, addGenreMovie);

  return { addGenreMovies, addGenreFilteredGenres, addGenreMovie };
};

const removeGenre = (movies: Movie[], filteredGenres: AutocompleteItem[], id: string, genre: string) => {
  let removeGenreMovies = movies;
  let removeGenreFilteredGenres = filteredGenres;
  const removeGenreMovie = { ...movies.find(m => m.id === id) };
  const index = removeGenreMovie.genres.findIndex(g => g === genre);

  if (!removeGenreMovie || index === -1) {
    return { removeGenreMovies, removeGenreFilteredGenres, removeGenreMovie };
  }

  removeGenreMovie.genres = removeGenreMovie.genres.slice(0, index).concat(removeGenreMovie.genres.slice(index + 1));
  removeGenreFilteredGenres = filterGenres(removeGenreMovies, removeGenreMovie);
  removeGenreMovies = updateMovie(movies, removeGenreMovie);

  return { removeGenreMovies, removeGenreFilteredGenres, removeGenreMovie };
};

const addActor = (movies: Movie[], actors: Actor[], filteredActors: AutocompleteItem[], id: string, actor: Actor) => {
  let addActorMovies = movies;
  let addActorFilteredActors = filteredActors;
  const addActorMovie = { ...movies.find(m => m.id === id) };
  const index = filteredActors.findIndex(p => p.value === actor.fullname);

  if (!addActorMovie || index === -1) {
    return { addActorMovies, addActorFilteredActors, addActorMovie };
  }

  addActorMovie.actors = [...addActorMovie.actors, actor].sort(compareActors);
  addActorFilteredActors = filterActors(addActorMovies, actors, addActorMovie);
  addActorMovies = updateMovie(movies, addActorMovie);

  return { addActorMovies, addActorFilteredActors, addActorMovie };
};

const removeActor = (movies: Movie[], actors: Actor[], filteredActors: AutocompleteItem[], id: string, actor: Actor) => {
  let removeActorMovies = movies;
  let removeActorFilteredActors = filteredActors;
  const removeActorMovie = { ...movies.find(m => m.id === id) };
  const index = removeActorMovie.actors.findIndex(p => p.fullname === actor.fullname);

  if (!removeActorMovie || index === -1) {
    return { removeActorMovies, removeActorFilteredActors, removeActorMovie };
  }

  removeActorMovie.actors = removeActorMovie.actors.slice(0, index).concat(removeActorMovie.actors.slice(index + 1));
  removeActorFilteredActors = filterActors(removeActorMovies, actors, removeActorMovie);
  removeActorMovies = updateMovie(movies, removeActorMovie);

  return { removeActorMovies, removeActorFilteredActors, removeActorMovie };
};

const filterMovies = (movies: Movie[], pattern: string) => {
  return movies.filter(movie => {
    const fullString = (movie.title + ' ' + ' ' + movie.year + ' ' + movie.director + ' ' + movie.genres.join(' ') +
      movie.actors.map(actor => actor.fullname).join(' '))
      .toUpperCase();

    return fullString.indexOf(pattern.toUpperCase()) > -1;
  });
};

const filterGenres = (movies: Movie[], selectedMovie: Movie): AutocompleteItem[] => {
  if (movies.length === 0) {
    return [];
  }

  const filteredGenres = [...allGenres]
    .sort(compareGenres)
    .map(genre => ({ value: genre, data: genre }));

  if (!selectedMovie) {
    return filteredGenres;
  }

  return filteredGenres
    .filter(genre => !selectedMovie.genres.some(movieGenre => movieGenre === genre.value));
};

const filterActors = (movies: Movie[], actors: Actor[], selectedMovie: Movie): AutocompleteItem[] => {
  if (movies.length === 0 || actors.length === 0) {
    return [];
  }

  const filteredActors = [...actors]
    .sort(compareActors)
    .map(actor => ({ value: actor.fullname, data: actor }));

  if (!selectedMovie) {
    return filteredActors;
  }

  return filteredActors
    .filter(actor => !selectedMovie.actors.some(movieActor => movieActor.fullname === actor.value));
};

const sortMovies = (movies: Movie[]) => {
  return [...movies].sort(compareMovies);
};

const sortActors = (actors: Actor[]) => {
  return [...actors].sort(compareActors);
};

const sortGenres = (genres: string[]) => {
  return [...genres].sort(compareGenres);
};

const compareMovies = (a: Movie, b: Movie) => {
  return a.title > b.title ? 1 : -1;
};

const compareActors = (a: Actor, b: Actor) => {
  return a.fullname > b.fullname ? 1 : -1;
};

const compareGenres = (a: string, b: string) => {
  return a > b ? 1 : -1;
};

export const selectMovies = createFeatureSelector<State>('movies');

export const getMovies = createSelector(selectMovies, (state: State) => state.filteredMovies);
export const getMoviesCount = createSelector(selectMovies, (state: State) => state.movies.length);
export const getSelectedMovie = createSelector(selectMovies, (state: State) => state.selectedMovie);
export const getLoading = createSelector(selectMovies, (state: State) => state.loadingMovies || state.loadingActors);
export const getFilterPattern = createSelector(selectMovies, (state: State) => state.filterPattern);
export const getScrollPosition = createSelector(selectMovies, (state: State) => state.scrollPosition);
export const getAllActors = createSelector(selectMovies, (state: State) => state.actors);
export const getFilteredGenres = createSelector(selectMovies, (state: State) => state.filteredGenres);
export const getFilteredActors = createSelector(selectMovies, (state: State) => state.filteredActors);

