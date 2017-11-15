import { Action } from '@ngrx/store';

export const GET_GENRES = '[Movies edit] Get list';
export const NO_ACTION = '[Movies edit] No action';

export class GetGenres implements Action {
  readonly type = GET_GENRES;
}

export class NoAction implements Action {
  readonly type = NO_ACTION;
}

export type All
  = GetGenres
  | NoAction;

