import {combineReducers} from 'redux';
import auth from './reducer/reducer';
import app from './reducer/loader';

export default combineReducers({
  auth,
  app,
});
