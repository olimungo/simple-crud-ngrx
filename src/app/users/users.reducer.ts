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
  users: null,
  allUsers: null,
  selectedUserId: null,
  selectedUser: null,
  loading: false,
  url: null
};

export function usersReducer(state: State = defaultState, action: UsersActions.All) {
  switch (action.type) {
    case UsersActions.SET_URL:
      return { ...state, url: action.payload };
    case UsersActions.GET_LIST_FORCED:
      return { ...state, loading: true };
    case UsersActions.LIST_RETRIEVED:
      const users = (action.payload).sort(sortUsers);

      return {
        ...state, users: users, allUsers: users, loading: false,
        selectedUser: getUser(users, state.selectedUserId), selectedUserId: null
      };
    case UsersActions.ADD:
      return { ...state, selectedUser: <User>{} };
    case UsersActions.EDIT:
      return {
        ...state, selectedUser: getUser(state.allUsers, action.payload), url: addIdToUrl(state.url, action.payload),
        selectedUserId: geSelectedUserId(state.allUsers, action.payload)
      };
    case UsersActions.CREATE:
      return {
        ...state, selectedUser: null, users: addUser(state.users, action.payload), allUsers: addUser(state.allUsers, action.payload),
        url: removeIdFromUrl(state.url, state.selectedUser.id)
      };
    case UsersActions.UPDATE:
      return {
        ...state, users: updateUser(state.users, action.payload), allUsers: updateUser(state.allUsers, action.payload),
        selectedUser: null, url: removeIdFromUrl(state.url, state.selectedUser.id)
      };
    case UsersActions.CANCEL:
      return { ...state, selectedUser: null, url: removeIdFromUrl(state.url, state.selectedUser.id) };
    case UsersActions.DELETE:
      return {
        ...state, selectedUser: null, users: deleteUser(state.users, action.payload), allUsers: deleteUser(state.allUsers, action.payload),
        url: removeIdFromUrl(state.url, state.selectedUser.id)
      };
    case UsersActions.FILTER:
      return { ...state, movies: filterUsers(state.allUsers, action.payload) };
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
  return ([...users, user]).sort(sortUsers);
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

const sortUsers = (a: User, b: User) => {
  return a.lastname + a.firstname > b.lastname + b.firstname ? 1 : -1;
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
export const getUsersCount = createSelector(selectUsers, (state: State) => state.allUsers ? state.allUsers.length.toString() : null);
export const getSelectedUser = createSelector(selectUsers, (state: State) => state.selectedUser);
export const getLoading = createSelector(selectUsers, (state: State) => state.loading);
export const getUrl = createSelector(selectUsers, (state: State) => state.url);

