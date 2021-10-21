import {combineReducers} from 'redux';
import APP from './appReducer';
import USER from './userReducer';
import DONATION from './donationReducer';
export default combineReducers({APP, USER, DONATION});
