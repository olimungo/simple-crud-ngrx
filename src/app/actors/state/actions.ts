import { Action } from '@ngrx/store';
import { Actor } from '../../core/models';

export const GET_LIST = '[Actors-list] Get list';
export const GET_LIST_FORCED = '[Actors-list] Get list forced';
export const LIST_RETRIEVED = '[Actors-list] List retrieved';
export const FILTER = '[Actors-list] Filter';
export const SAVE_SCROLL_POSITION = '[Actors-list] Save scroll position';
export const EDIT = '[Actors-list] Edit';
export const CREATE = '[Actors-list] Create';
export const CREATE_DONE = '[Actors-list] Create done';
export const UPDATE = '[Actors-list] Update';
export const CANCEL = '[Actors-list] Cancel';
export const DELETE = '[Actors-list] Delete';
export const NO_ACTION = '[Actors-list] No action';

export class GetList implements Action {
  readonly type = GET_LIST;
}

export class GetListForced implements Action {
  readonly type = GET_LIST_FORCED;
}

export class ListRetrieved implements Action {
  readonly type = LIST_RETRIEVED;

  constructor(public payload: Actor[]) { }
}

export class Filter implements Action {
  readonly type = FILTER;

  constructor(public payload: string) { }
}

export class SaveScrollPosition implements Action {
  readonly type = SAVE_SCROLL_POSITION;

  constructor(public payload: number) { }
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: string) { }
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: Actor) { }
}

export class CreateDone implements Action {
  readonly type = CREATE_DONE;

  constructor(public payload: Actor) { }
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: Actor) { }
}

export class Cancel implements Action {
  readonly type = CANCEL;
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: string) { }
}

export class NoAction implements Action {
  readonly type = NO_ACTION;
}

export type All
  = GetList
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

