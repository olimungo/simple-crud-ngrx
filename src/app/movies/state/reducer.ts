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

      // If there's already a selectedMovie (for example, when an EDIT was triggered), don't look for the movie
      // in the retrieved array.
      selectedMovie = !state.selectedMovieId ? state.selectedMovie : getMovie(movies, state.selectedMovieId);

      return {
        ...state, filteredMovies: movies, movies: movies, loadingMovies: false,
        selectedMovie, selectedMovieId: null,
        filteredGenres: filterGenres(allGenres, selectedMovie),
        filteredActors: filterActors(state.actors, selectedMovie)
      };
    case Actions.LIST_ACTORS_RETRIEVED:
      actors = sortActors(action.payload);

      return {
        ...state, actors, loadingActors: false,
        filteredGenres: filterGenres(allGenres, state.selectedMovie),
        filteredActors: filterActors(actors, state.selectedMovie),
      };
    case Actions.EDIT:
    if (action.payload) {
        selectedMovie = getMovie(state.movies, action.payload);
      } else {
        selectedMovie = { id: '', title: '', genres: [], year: null, director: '', actors: [] };
      }

      return {
        ...state, selectedMovie,
        selectedMovieId: state.movies.length > 0 ? null : action.payload,
        filteredGenres: filterGenres(allGenres, selectedMovie),
        filteredActors: filterActors(state.actors, selectedMovie),
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
      const { addGenreFilteredGenres, addGenreMovie } =
        addGenre(state.selectedMovie, allGenres, state.filteredGenres, action.payload);

      return { ...state, filteredGenres: addGenreFilteredGenres, selectedMovie: addGenreMovie };
    }
    case Actions.REMOVE_GENRE:
      const { removeGenreFilteredGenres, removeGenreMovie } =
        removeGenre(state.selectedMovie, allGenres, state.filteredGenres, action.payload);

      return { ...state, filteredGenres: removeGenreFilteredGenres, selectedMovie: removeGenreMovie };
    case Actions.ADD_ACTOR: {
      console.log(state.selectedMovie)
      const { addActorFilteredActors, addActorMovie } =
        addActor(state.selectedMovie, state.actors, state.filteredActors, action.payload);

      return { ...state, filteredActors: addActorFilteredActors, selectedMovie: addActorMovie };
    }
    case Actions.REMOVE_ACTOR:
      const { removeActorFilteredActors, removeActorMovie } =
        removeActor(state.selectedMovie, state.actors, state.filteredActors, action.payload);

      return { ...state, filteredActors: removeActorFilteredActors, selectedMovie: removeActorMovie };
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

const addGenre = (movie: Movie, genres: string[], filteredGenres: AutocompleteItem[], genre: string) => {
  const addGenreMovie = { ...movie };
  let addGenreFilteredGenres = filteredGenres;

  addGenreMovie.genres = [...addGenreMovie.genres, genre].sort(compareGenres);
  addGenreFilteredGenres = filterGenres(genres, addGenreMovie);

  return { addGenreFilteredGenres, addGenreMovie };
};

const removeGenre = (movie: Movie, genres: string[], filteredGenres: AutocompleteItem[], genre: string) => {
  const removeGenreMovie = { ...movie };
  let removeGenreFilteredGenres = filteredGenres;
  const index = removeGenreMovie.genres.findIndex(g => g === genre);

  removeGenreMovie.genres = removeGenreMovie.genres.slice(0, index).concat(removeGenreMovie.genres.slice(index + 1));
  removeGenreFilteredGenres = filterGenres(genres, removeGenreMovie);

  return { removeGenreFilteredGenres, removeGenreMovie };
};

const addActor = (movie: Movie, actors: Actor[], filteredActors: AutocompleteItem[], actor: Actor) => {
  const addActorMovie = { ...movie };
  let addActorFilteredActors = filteredActors;

  addActorMovie.actors = [...addActorMovie.actors, actor].sort(compareActors);
  addActorFilteredActors = filterActors(actors, addActorMovie);

  return { addActorFilteredActors, addActorMovie };
};

const removeActor = (movie: Movie, actors: Actor[], filteredActors: AutocompleteItem[], actor: Actor) => {
  const removeActorMovie = { ...movie };
  let removeActorFilteredActors = filteredActors;
  const index = removeActorMovie.actors.findIndex(p => p.fullname === actor.fullname);

  removeActorMovie.actors = removeActorMovie.actors.slice(0, index).concat(removeActorMovie.actors.slice(index + 1));
  removeActorFilteredActors = filterActors(actors, removeActorMovie);

  return { removeActorFilteredActors, removeActorMovie };
};

const filterMovies = (movies: Movie[], pattern: string) => {
  return movies.filter(movie => {
    const fullString = (movie.title + ' ' + movie.year + ' ' + movie.director + ' ' + movie.genres.join(' ') + ' ' +
      movie.actors.map(actor => actor.fullname).join(' '))
      .toUpperCase();

    return fullString.indexOf(pattern.toUpperCase()) > -1;
  });
};

const filterGenres = (genres: string[], selectedMovie: Movie): AutocompleteItem[] => {
  const filteredGenres = [...genres]
    .sort(compareGenres)
    .map(genre => ({ value: genre, data: genre }));

  if (!selectedMovie) {
    return filteredGenres;
  }

  return filteredGenres
    .filter(genre => !selectedMovie.genres.some(movieGenre => movieGenre === genre.value));
};

const filterActors = (actors: Actor[], selectedMovie: Movie): AutocompleteItem[] => {
  if (actors.length === 0) {
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

