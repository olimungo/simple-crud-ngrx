import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { User } from './user.entity';

export type Action = UsersActions.All;

export interface State {
  users: User[];
  allUsers: User[];
  selectedUserId: string;
  selectedUser: User;
  loading: boolean;
  filterPattern: string;
  scrollPosition: number;
}

const defaultState: State = {
  users: null,
  allUsers: null,
  selectedUserId: null,
  selectedUser: null,
  loading: false,
  filterPattern: '',
  scrollPosition: 0
};

export function usersReducer(state: State = defaultState, action: UsersActions.All) {
  switch (action.type) {
    case UsersActions.GET_LIST_FORCED:
      return { ...state, loading: true };
    case UsersActions.LIST_RETRIEVED:
      const users = sortUsers(action.payload);

      return {
        ...state, users: users, allUsers: users, loading: false,
        selectedUser: getUser(users, state.selectedUserId), selectedUserId: null
      };
    case UsersActions.ADD:
      return { ...state, selectedUser: <User>{} };
    case UsersActions.EDIT:
      return {
        ...state, selectedUser: getUser(state.allUsers, action.payload), selectedUserId: geSelectedUserId(state.allUsers, action.payload)
      };
    case UsersActions.CREATE:
      return {
        ...state, selectedUser: null, users: addUser(state.users, action.payload), allUsers: addUser(state.allUsers, action.payload)
      };
    case UsersActions.UPDATE:
      return {
        ...state, users: updateUser(state.users, action.payload), allUsers: updateUser(state.allUsers, action.payload)
      };
    case UsersActions.CANCEL:
      return { ...state, selectedUser: null };
    case UsersActions.DELETE:
      return {
        ...state, selectedUser: null, users: deleteUser(state.users, action.payload), allUsers: deleteUser(state.allUsers, action.payload)
      };
    case UsersActions.FILTER:
      return { ...state, filterPattern: action.payload, users: filterUsers(state.allUsers, action.payload) };
    case UsersActions.SAVE_SCROLL_POSITION:
      return { ...state, scrollPosition: action.payload };
    default:
      return state;
  }
}

const geSelectedUserId = (users: User[], id: string) => {
  return users ? null : id;
};

const getUser = (users: User[], id: string) => {
  return users ? users.find(user => user.id === id) : null;
};

const addUser = (users: User[], user: User) => {
  return ([...users, user]).sort(compareUsers);
};

const updateUser = (users: User[], user: User) => {
  return addUser(deleteUser(users, user.id), user);
};

const deleteUser = (users: User[], id: string) => {
  const index = users.findIndex(user => user.id === id);
  return users.slice(0, index).concat(users.slice(index + 1));
};

const filterUsers = (users: User[], pattern: string) => {
  return users.filter(user => {
    const fullString = (user.firstname + ' ' + user.lastname).toUpperCase();
    return fullString.indexOf(pattern.toUpperCase()) > -1;
  });
};

const sortUsers = (users: User[]) => {
  return [...users].sort(compareUsers);
};

const compareUsers = (a: User, b: User) => {
  return a.lastname + a.firstname > b.lastname + b.firstname ? 1 : -1;
};

export const selectUsers = createFeatureSelector<State>('users');

export const getUsers = createSelector(selectUsers, (state: State) => state.users);
export const getUsersCount = createSelector(selectUsers, (state: State) => state.allUsers ? state.allUsers.length.toString() : null);
export const getSelectedUser = createSelector(selectUsers, (state: State) => state.selectedUser);
export const getLoading = createSelector(selectUsers, (state: State) => state.loading);
export const getFilterPattern = createSelector(selectUsers, (state: State) => state.filterPattern);
export const getScrollPosition = createSelector(selectUsers, (state: State) => state.scrollPosition);
