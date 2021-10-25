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
    case ActionType.USER_LOGOUT: {
      return InitialUserState;
    }
    default:
      return state;
  }
};
