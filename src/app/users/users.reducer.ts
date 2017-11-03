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
  url: string;
}

const defaultState: State = {
  users: [],
  allUsers: [],
  selectedUserId: null,
  selectedUser: null,
  loading: false,
  url: null
};

export function usersReducer(state: State = defaultState, action: UsersActions.All) {
  let user: User = null;

  switch (action.type) {
    case UsersActions.SET_URL:
      return { ...state, url: action.payload };
    case UsersActions.GET_LIST:
      return { ...state, loading: true };
    case UsersActions.LIST_RETRIEVED:
      if (state.selectedUserId) {
        user = action.payload.find(u => u.id === state.selectedUserId);
      }

      return { ...state, users: action.payload, allUsers: action.payload, loading: false, selectedUser: user, selectedUserId: null };
    case UsersActions.ADD:
      return { ...state, selectedUser: <User>{} };
    case UsersActions.EDIT:
      let selectedUserId = null;
      user = state.users.find(u => u.id === action.payload);

      if (!user) {
        selectedUserId = action.payload;
        user = null;
      }

      return { ...state, selectedUser: user, url: addIdToUrl(state.url, action.payload), selectedUserId: selectedUserId };
    case UsersActions.CREATE:
      return {
        ...state, selectedUser: null, users: addUser(state.users, action.payload),
        url: removeIdFromUrl(state.url, state.selectedUser.id)
      };
    case UsersActions.UPDATE:
      return { ...state, selectedUser: null, url: removeIdFromUrl(state.url, state.selectedUser.id) };
    case UsersActions.CANCEL:
      return { ...state, selectedUser: null, url: removeIdFromUrl(state.url, state.selectedUser.id) };
    case UsersActions.DELETE:
      return {
        ...state, selectedUser: null, users: deleteUser(state.users, action.payload),
        url: removeIdFromUrl(state.url, state.selectedUser.id)
      };
    case UsersActions.FILTER:
      return { ...state, users: state.allUsers.filter(u => {
        const full = (u.lastname + ' ' + u.firstname).toUpperCase();
        const pattern = (action.payload).toUpperCase();
        return full.indexOf(pattern) > -1;
      })};
    default:
      return state;
  }
}

const getUser = (users: User[], id: string) => {
  return users.find(user => user.id === id);
};

const addUser = (users: User[], user: User) => {
  const newUsers = <User[]>[];
  let userInserted = false;

  users.forEach(u => {
    if (u.lastname + u.firstname > user.lastname + user.firstname && !userInserted) {
      userInserted = true;
      newUsers.push(user);
    }

    newUsers.push(u);
  });

  if (!userInserted) {
    newUsers.push(user);
  }

  return newUsers;
};

const deleteUser = (users: User[], id: string) => {
  const newUsers = <User[]>[];

  users.forEach(u => {
    if (u.id !== id) {
      newUsers.push(u);
    }
  });

  return newUsers;
};

const addIdToUrl = (url: string, id: string) => {
  if (url.indexOf(`/${id}`) > -1) {
    return url;
  }

  return `${url}/${id}`;
};

const removeIdFromUrl = (url: string, id: string) => {
  return url.replace(`/${id}`, '');
};

export const selectUsers = createFeatureSelector<State>('users');

export const getUsers = createSelector(selectUsers, (state: State) => state.users);
export const getSelectedUser = createSelector(selectUsers, (state: State) => state.selectedUser);
export const getLoading = createSelector(selectUsers, (state: State) => state.loading);
export const getUrl = createSelector(selectUsers, (state: State) => state.url);

