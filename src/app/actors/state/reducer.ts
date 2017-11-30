import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as Actions from './actions';
import { Actor } from '../../core/models';

export type Action = Actions.All;

export interface State {
  actors: Actor[];
  filteredActors: Actor[];
  loading: boolean;
  filterPattern: string;
  scrollPosition: number;
  selectedActorId: string;
  selectedActor: Actor;
}

const defaultState: State = {
  actors: [],
  filteredActors: [],
  loading: false,
  filterPattern: '',
  scrollPosition: 0,
  selectedActorId: null,
  selectedActor: null
};

export function reducer(state: State = defaultState, action: Actions.All): State {
  switch (action.type) {
    case Actions.GET_LIST_FORCED:
      return { ...state, loading: true };
    case Actions.LIST_RETRIEVED:
      const actors = sortActors(action.payload);

      return {
        ...state, filteredActors: actors, actors: actors, loading: false,
        selectedActor: getActor(actors, state.selectedActorId), selectedActorId: null
      };
    case Actions.FILTER:
      return { ...state, filterPattern: action.payload, filteredActors: filterActors(state.actors, action.payload) };
    case Actions.SAVE_SCROLL_POSITION:
      return { ...state, scrollPosition: action.payload };
    case Actions.EDIT:
      return {
        ...state, selectedActor: getActor(state.actors, action.payload),
        selectedActorId: state.actors.length > 0 ? null : action.payload
      };
    case Actions.CREATE:
      // Nothing to change to the store at this point. An effect CREATE is also triggered and will subsequently fire a CREATE_DONE action.
      return state;
    case Actions.CREATE_DONE:
      return {
        ...state, filteredActors: addActor(state.filteredActors, action.payload), actors: addActor(state.actors, action.payload)
      };
    case Actions.UPDATE:
      return {
        ...state, filteredActors: updateActor(state.filteredActors, action.payload), actors: updateActor(state.actors, action.payload)
      };
    case Actions.CANCEL:
      return { ...state, selectedActor: null };
    case Actions.DELETE:
      return {
        ...state, selectedActor: null, filteredActors: deleteActor(state.filteredActors, action.payload),
        actors: deleteActor(state.actors, action.payload)
      };
    default:
      return state;
  }
}

const getActor = (actors: Actor[], id: string) => {
  return actors ? actors.find(actor => actor.id === id) : null;
};

const addActor = (actors: Actor[], actor: Actor) => {
  const newActor = { ...actor, fullname: actor.lastname + ' ' + actor.firstname };
  return ([...actors, newActor]).sort(compareActors);
};

const updateActor = (actors: Actor[], actor: Actor) => {
  return addActor(deleteActor(actors, actor.id), actor);
};

const deleteActor = (actors: Actor[], id: string) => {
  const index = actors.findIndex(actor => actor.id === id);
  return actors.slice(0, index).concat(actors.slice(index + 1));
};

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

export const getState = createFeatureSelector<State>('actors');

export const getActors = createSelector(getState, (state: State) => state.filteredActors);
export const getActorsCount = createSelector(getState, (state: State) => state.actors.length);
export const getLoading = createSelector(getState, (state: State) => state.loading);
export const getFilterPattern = createSelector(getState, (state: State) => state.filterPattern);
export const getScrollPosition = createSelector(getState, (state: State) => state.scrollPosition);
export const getSelectedActor = createSelector(getState, (state: State) => state.selectedActor);

