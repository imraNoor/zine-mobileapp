import ActionType from '../types';

const InitialDonationState = {
  target: {},
  stripKey: null,
};

export default (
  state = InitialDonationState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case ActionType.DONATION_TARGET: {
      return {
        ...state,
        target: payload ? payload : {},
      };
    }
    case ActionType.SET_STRIP: {
      return {
        ...state,
        stripKey: payload ? payload : null,
      };
    }
    case ActionType.USER_LOGOUT: {
      return InitialDonationState;
    }
    default:
      return state;
  }
};
