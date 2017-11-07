import { Store, Action } from '@ngrx/store';

import { User } from '../user.entity';

export const GET_LIST = '[Users] Get list';
export const GET_LIST_FORCED = '[Users] Get list forced';
export const LIST_RETRIEVED = '[Users] List retrieved';
export const ADD = '[Users] Add';
export const EDIT = '[Users] Edit';
export const CREATE = '[Users] Create';
export const UPDATE = '[Users] Update';
export const CANCEL = '[Users] Cancel';
export const DELETE = '[Users] Delete';
export const FILTER = '[Users] Filter';
export const SAVE_SCROLL_POSITION = '[Users] Save scroll position';
export const NO_ACTION = '[Users] No action';

export class GetList implements Action {
  readonly type = GET_LIST;
}

export class GetListForced implements Action {
  readonly type = GET_LIST_FORCED;
}

export class ListRetrieved implements Action {
  readonly type = LIST_RETRIEVED;

  constructor(public payload: User[]) { }
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

  constructor(public payload: User) { }
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: User) { }
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

