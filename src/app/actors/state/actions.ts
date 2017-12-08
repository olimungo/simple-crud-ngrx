import { Action } from '@ngrx/store';
import { Actor } from '../../core/models';

export const GET_LIST = '[Actors] Get list';
export const GET_LIST_FORCED = '[Actors] Get list forced';
export const LIST_RETRIEVED = '[Actors] List retrieved';
export const FILTER = '[Actors] Filter';
export const SAVE_SCROLL_POSITION = '[Actors] Save scroll position';
export const EDIT = '[Actors] Edit';
export const CREATE = '[Actors] Create';
export const CREATE_DONE = '[Actors] Create done';
export const UPDATE = '[Actors] Update';
export const CANCEL = '[Actors] Cancel';
export const DELETE = '[Actors] Delete';
export const NO_ACTION = '[Actors] No action';

export class GetList implements Action {
  readonly type = GET_LIST;
}

export class GetListForced implements Action {
  readonly type = GET_LIST_FORCED;
}

export class ListRetrieved implements Action {
  readonly type = LIST_RETRIEVED;

  constructor(public payload: Actor[]) {}
}

export class Filter implements Action {
  readonly type = FILTER;

  constructor(public payload: string) {}
}

export class SaveScrollPosition implements Action {
  readonly type = SAVE_SCROLL_POSITION;

  constructor(public payload: number) {}
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: string) {}
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: Actor) {}
}

export class CreateDone implements Action {
  readonly type = CREATE_DONE;

  constructor(public payload: Actor) {}
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: Actor) {}
}

export class Cancel implements Action {
  readonly type = CANCEL;
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: string) {}
}

export class NoAction implements Action {
  readonly type = NO_ACTION;
}

export type All =
  | GetList
  | GetListForced
  | ListRetrieved
  | Filter
  | SaveScrollPosition
  | Create
  | CreateDone
  | Update
  | Edit
  | Cancel
  | Delete
  | NoAction;
