import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as ActorsActions from './list.actions';
import { Actor } from '../../../core/models';

export type Action = ActorsActions.All;

export interface State {
  allActors: Actor[];
  actors: Actor[];
  loading: boolean;
  filterPattern: string;
  scrollPosition: number;
}

const defaultState: State = {
  allActors: [],
  actors: [],
  loading: false,
  filterPattern: '',
  scrollPosition: 0
};

export function reducer(state: State = defaultState, action: ActorsActions.All) {
  switch (action.type) {
    case ActorsActions.GET_LIST_FORCED:
      return { ...state, loading: true };
    case ActorsActions.LIST_RETRIEVED:
      const actors = sortActors(action.payload);

      return {
        ...state, actors: actors, allActors: actors, loading: false, selectedActorId: null
      };
    case ActorsActions.EDIT:
      return {
        ...state
      };
    case ActorsActions.FILTER:
      return { ...state, filterPattern: action.payload, actors: filterActors(state.allActors, action.payload) };
    case ActorsActions.SAVE_SCROLL_POSITION:
      return { ...state, scrollPosition: action.payload };
    default:
      return state;
  }
}

const filterActors = (actors: Actor[], pattern: string) => {
  return actors.filter(actor => {
    const fullString = actor.fullname.toUpperCase();
    return fullString.indexOf(pattern.toUpperCase()) > -1;
  });
};

const sortActors = (actors: Actor[]) => {
  return [...actors].sort(compareActors);
};

const compareActors = (a: Actor, b: Actor) => {
  return a.fullname > b.fullname ? 1 : -1;
};

export const selectActors = createFeatureSelector<State>('actors-list');

export const getActors = createSelector(selectActors, (state: State) => state.actors);
export const getActorsCount = createSelector(selectActors, (state: State) => state.allActors ? state.allActors.length : 0);
export const getLoading = createSelector(selectActors, (state: State) => state.loading);
export const getFilterPattern = createSelector(selectActors, (state: State) => state.filterPattern);
export const getScrollPosition = createSelector(selectActors, (state: State) => state.scrollPosition);
