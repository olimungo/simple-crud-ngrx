import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../state';
import * as ActorsActions from './actors.actions';
import { Actor } from '../actor.entity';

export type Action = ActorsActions.All;

export interface State extends fromRoot.State {
  actors: Actor[];
  allActors: Actor[];
  selectedActorId: string;
  selectedActor: Actor;
  loading: boolean;
  filterPattern: string;
  scrollPosition: number;
}

const defaultState: State = {
  actors: null,
  allActors: null,
  selectedActorId: null,
  selectedActor: null,
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
        ...state, actors: actors, allActors: actors, loading: false,
        selectedActor: getActor(actors, state.selectedActorId), selectedActorId: null
      };
    case ActorsActions.ADD:
      return { ...state, selectedActor: <Actor>{} };
    case ActorsActions.EDIT:
      return {
        ...state, selectedActor: getActor(state.allActors, action.payload), selectedActorId: geSelectedActorId(state.allActors, action.payload)
      };
    case ActorsActions.CREATE:
      // Nothing to change to the store at this point. An effect CREATE is also triggered and will subsequently fire a CREATE_DONE action.
      return state;
    case ActorsActions.CREATE_DONE:
      return {
        ...state, actors: addActor(state.actors, action.payload), allActors: addActor(state.allActors, action.payload)
      };
    case ActorsActions.UPDATE:
      return {
        ...state, actors: updateActor(state.actors, action.payload), allActors: updateActor(state.allActors, action.payload)
      };
    case ActorsActions.CANCEL:
      return { ...state, selectedActor: null };
    case ActorsActions.DELETE:
      return {
        ...state, selectedActor: null, actors: deleteActor(state.actors, action.payload), allActors: deleteActor(state.allActors, action.payload)
      };
    case ActorsActions.FILTER:
      return { ...state, filterPattern: action.payload, actors: filterActors(state.allActors, action.payload) };
    case ActorsActions.SAVE_SCROLL_POSITION:
      return { ...state, scrollPosition: action.payload };
    default:
      return state;
  }
}

const geSelectedActorId = (actors: Actor[], id: string) => {
  return actors ? null : id;
};

const getActor = (actors: Actor[], id: string) => {
  return actors ? actors.find(actor => actor.id === id) : null;
};

const addActor = (actors: Actor[], actor: Actor) => {
  return ([...actors, actor]).sort(compareActors);
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
    const fullString = (actor.firstname + ' ' + actor.lastname).toUpperCase();
    return fullString.indexOf(pattern.toUpperCase()) > -1;
  });
};

const sortActors = (actors: Actor[]) => {
  return [...actors].sort(compareActors);
};

const compareActors = (a: Actor, b: Actor) => {
  return a.lastname + a.firstname > b.lastname + b.firstname ? 1 : -1;
};

export const selectActors = createFeatureSelector<State>('actors');

export const getActors = createSelector(selectActors, (state: State) => state.actors);
export const getActorsCount = createSelector(selectActors, (state: State) => state.allActors ? state.allActors.length.toString() : null);
export const getSelectedActor = createSelector(selectActors, (state: State) => state.selectedActor);
export const getLoading = createSelector(selectActors, (state: State) => state.loading);
export const getFilterPattern = createSelector(selectActors, (state: State) => state.filterPattern);
export const getScrollPosition = createSelector(selectActors, (state: State) => state.scrollPosition);