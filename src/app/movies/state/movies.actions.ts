import { Action } from '@ngrx/store';
import { Movie, Actor } from '../../core/models';

export const GET_LIST = '[Movies] Get list';
export const GET_LIST_FORCED = '[Movies] list forced';
export const GET_LIST_ACTORS_FORCED = '[Movies] list actors forced';
export const LIST_RETRIEVED = '[Movies] List retrieved';
export const LIST_ACTORS_RETRIEVED = '[Movies] List actors retrieved';
export const EDIT = '[Movies] Edit';
export const CREATE = '[Movies] Create';
export const CREATE_DONE = '[Movies] Create done';
export const UPDATE = '[Movies] Update';
export const CANCEL = '[Movies] Cancel';
export const DELETE = '[Movies] Delete';
export const FILTER = '[Movies] Filter';
export const SAVE_SCROLL_POSITION = '[Movies] Save scroll position';
export const NO_ACTION = '[Movies] No action';

export class GetList implements Action {
  readonly type = GET_LIST;
}

export class GetListForced implements Action {
  readonly type = GET_LIST_FORCED;
}

export class GetListActorsForced implements Action {
  readonly type = GET_LIST_ACTORS_FORCED;
}

export class ListRetrieved implements Action {
  readonly type = LIST_RETRIEVED;

  constructor(public payload: Movie[]) { }
}

export class ListActorsRetrieved implements Action {
  readonly type = LIST_ACTORS_RETRIEVED;

  constructor(public payload: Actor[]) { }
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: string) { }
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: Movie) { }
}

export class CreateDone implements Action {
  readonly type = CREATE_DONE;

  constructor(public payload: Movie) { }
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: Movie) { }
}

export class Cancel implements Action {
  readonly type = CANCEL;
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: string) { }
}

export class Filter implements Action {
  readonly type = FILTER;

  constructor(public payload: string) { }
}

export class SaveScrollPosition implements Action {
  readonly type = SAVE_SCROLL_POSITION;

  constructor(public payload: number) { }
}

export class NoAction implements Action {
  readonly type = NO_ACTION;
}

export type All
  = GetList
  | GetListForced
  | GetListActorsForced
  | ListRetrieved
  | ListActorsRetrieved
  | Create
  | CreateDone
  | Update
  | Edit
  | Cancel
  | Delete
  | Filter
  | SaveScrollPosition
  | NoAction;

