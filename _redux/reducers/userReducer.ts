import ActionType from '../types';

const InitialUserState = {
  detail: {},
  loggedIn: false,
};

export default (
  state = InitialUserState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case ActionType.USER_AUTHORIZE: {
      return {
        detail: payload,
        loggedIn: true,
      };
    }
    case ActionType.UPDATE_UNREAD_COUNTER: {
      return {
        ...state,
        detail: {...state.detail, unread_notifications_count: payload},
      };
    }
    case ActionType.USER_LOGOUT: {
      return InitialUserState;
    }
    default:
      return state;
  }
};
