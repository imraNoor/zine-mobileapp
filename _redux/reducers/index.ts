import {combineReducers} from 'redux';
import APP from './appReducer';
import USER from './userReducer';
export default combineReducers({APP, USER});
