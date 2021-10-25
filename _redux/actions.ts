import ActionTypes from './types';
const setLoader = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.FETCHING_LOADING, payload});
};
const letAuthorizeUser = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.USER_AUTHORIZE, payload});
};
const refreshProfile = (payload: any) => (dispatch: Function) => {
  dispatch({type: ActionTypes.USER_AUTHORIZE, payload});
};
const letLogout = () => (dispatch: Function) => {
  dispatch({type: ActionTypes.USER_LOGOUT});
};

export default {
  setLoader,
  letAuthorizeUser,
  letLogout,
  refreshProfile,
};
