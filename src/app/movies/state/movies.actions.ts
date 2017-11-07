import { Store, Action } from '@ngrx/store';

import { Movie } from '../movie.entity';

export const SET_URL = '[Movies] Set URL';
export const GET_LIST = '[Movies] Get list';
export const GET_LIST_FORCED = '[Movies] list forced';
export const LIST_RETRIEVED = '[Movies] List retrieved';
export const ADD = '[Movies] Add';
export const EDIT = '[Movies] Edit';
export const CREATE = '[Movies] Create';
export const UPDATE = '[Movies] Update';
export const CANCEL = '[Movies] Cancel';
export const DELETE = '[Movies] Delete';
export const FILTER = '[Movies] Filter';
export const SAVE_SCROLL_POSITION = '[Movies] Save scroll position';
export const NO_ACTION = '[Movies] No action';

export class SetUrl implements Action {
  readonly type = SET_URL;

  constructor(public payload: string) { }
}

export class GetList implements Action {
  readonly type = GET_LIST;
}

export class GetListForced implements Action {
  readonly type = GET_LIST_FORCED;
}

export class ListRetrieved implements Action {
  readonly type = LIST_RETRIEVED;

  constructor(public payload: Movie[]) { }
}

export class Add implements Action {
  readonly type = ADD;
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: string) { }
}

export class Create implements Action {
  readonly type = CREATE;

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
  = SetUrl
  | GetList
  | GetListForced
  | ListRetrieved
  | Add
  | Create
  | Update
  | Edit
  | Cancel
  | Delete
  | Filter
  | SaveScrollPosition
  | NoAction;
