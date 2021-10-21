import * as Actions from '../actiontype';
import APIs from '../../lib/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};
// const getData = async key => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     if (value !== null) {
//       return value;
//     }
//   } catch (e) {
//     // error reading value
//   }
// };
export const adminLogin = (email: string, password: string) => {
  return async (dispatch: Function, getState: Function) =>
    APIs.Login({email, password}).then(response => {
      if (response) {
        const {success, data, message} = response;
        // console.log("Login :", data)
        if (success) {
          // getData('jjj').then((ddsd)=>{console.log(ddsd)})
          storeData('token', data.token);
          //Store Here in memory
          dispatch({
            type: Actions.LOGIN_SUCCESS,
            payload: response,
          });
          return {success};
        } else {
          return data;
          //console.log('Error', JSON.stringify(data));
        }
      }
    });
};
export const register = (
  name: string,
  phone: numnber,
  cityName: string,
  email: string,
  password: string,
  c_password: sting,
) => {
  console.log(name, phone, cityName, email, password, c_password);
  return async (dispatch: Function, getState: Function) =>
    APIs.Register({name, email, phone, password, c_password}).then(response => {
      if (response) {
        console.log(response);
        const {success, data, message} = response;
        if (success) {
          // getData('jjj').then((ddsd)=>{console.log(ddsd)})
          // storeData('account'.data);
          //Store Here in memory
          dispatch({
            type: Actions.LOGIN_SUCCESS,
            payload: response,
          });
          return {success};
        } else {
          console.log('errow');
          return data;
        }
      }
    });
};
