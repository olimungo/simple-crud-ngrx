import { Store, Action } from '@ngrx/store';

import { User } from './user.entity';

export const LIST = '[Users] List';
export const GET = '[Users] Get';
export const ADD = '[Users] Add';
export const EDIT = '[Users] Edit';
export const SAVE = '[Users] Save';
export const CANCEL = '[Users] Cancel';
export const DELETE = '[Users] Delete';

export class List implements Action {
  readonly type = LIST;

  constructor(public payload: User) {}
}

export class Get implements Action {
  readonly type = GET;

  constructor(public payload: string) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: User) {}
}

export class Edit implements Action {
  readonly type = EDIT;

  constructor(public payload: User) {}
}

export class Save implements Action {
  readonly type = SAVE;

  constructor(public payload: User) {}
}

export class Cancel implements Action {
  readonly type = CANCEL;
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: string) {}
}

export type All
  = List
  | Get
  | Add
  | Edit
  | Save
  | Cancel
  | Delete;

