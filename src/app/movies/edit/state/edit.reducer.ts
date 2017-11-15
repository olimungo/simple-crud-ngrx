import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as MoviesEditActions from './edit.actions';
import { allGenres } from '../../../core/models';

export interface State {
  genres: Array<string>;
}

const defaultState: State = {
  genres: allGenres
};

export function reducer(state: State = defaultState, action: MoviesEditActions.All) {
  switch (action.type) {
    case MoviesEditActions.GET_GENRES:
      return { ...state };
    default:
      return state;
  }
}

export const selectMoviesEdit = createFeatureSelector<State>('movies-edit');

export const getGenres = createSelector(selectMoviesEdit, (state: State) => state.genres);

