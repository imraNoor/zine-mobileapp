import * as Actions from '../actiontype';

const initialState = {
  isLoading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOAD_TOGGLE:
      return {
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};
