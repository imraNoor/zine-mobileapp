import ActionType from '../types';
const InitialAppState = {
  authLoading: false,
  fetchingLoading: false,
  firstTimeAfterOpen: false,
};

export default (
  state = InitialAppState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case ActionType.FETCHING_LOADING: {
      return {
        ...state,
        fetchingLoading: payload,
      };
    }
    case ActionType.FirstTimeShowNDONE: {
      return {
        ...state,
        firstTimeAfterOpen: true,
      };
    }
    default:
      return state;
  }
};
