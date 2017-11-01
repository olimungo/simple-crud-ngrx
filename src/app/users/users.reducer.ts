import * as UsersActions from './users.actions';
import { User } from './user.entity';

export type Action = UsersActions.All;

interface UsersState {
  users: User[];
  selectedUser: User;
}

const defaultState: UsersState = {
  users: [],
  selectedUser: null
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function usersReducer(state: UsersState = defaultState, action: Action) {
  console.log(action.type, state);

  switch (action.type) {
    case UsersActions.LIST:
    return newState(state, { selectedUser: action.payload }); 
    case UsersActions.EDIT:
      return newState(state, { selectedUser: action.payload });
    // case PostActions.UPVOTE:
    //   return newState(state, { likes: state.likes + 1 });
    // case PostActions.DOWNVOTE:
    //   return newState(state, { likes: state.likes - 1 });
    // case PostActions.RESET:
    //   return newState(state, defaultState);
    default:
      return state;
  }

}

