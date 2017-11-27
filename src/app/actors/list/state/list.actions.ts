import { Action } from '@ngrx/store';
import { Actor } from '../../../core/models';

export const GET_LIST = '[Actors] Get list';
export const GET_LIST_FORCED = '[Actors] Get list forced';
export const LIST_RETRIEVED = '[Actors] List retrieved';
export const EDIT = '[Actors] Edit';
export const FILTER = '[Actors] Filter';
export const SAVE_SCROLL_POSITION = '[Actors] Save scroll position';
export const NO_ACTION = '[Actors] No action';

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

export class Edit implements Action {
  readonly type = EDIT;

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
  | Edit
  | Filter
  | SaveScrollPosition
  | NoAction;

