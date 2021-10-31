import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {helperNavigate} from '../../navigation/navHelper';
const monthArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const configure = () => {
  PushNotification.configure({
    // user accepted notification permission - register token
    onRegister: function (tokenData) {
      const {token} = tokenData;
      //console.log('jjj', token);
      // handle device token
      // send token to server...
      // store in AsyncStorage...
    },
    // notification received / opened in-app event
    onNotification: function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // outlining what permissions to accept
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  });
};
const requestUserPermissionForMessaging = async () => {
  // const authStatus = await messaging().registerDeviceForRemoteMessages();
  // const authStatus = await PERMISSIONS.requestNotifications(['alert', 'sound']);
  const authStatus: any = await messaging().requestPermission();
  //console.log('Authorization status:', authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL ||
    authStatus === true ||
    authStatus.status === 'granted';

  if (enabled) {
    //console.log('Authorization status:', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === true ||
      authStatus.status === 'granted'
    );
  }
  return Platform.OS === 'android';
};
const updateMyToken = (getToken = (token: string) => {}) => {
  try {
    requestUserPermissionForMessaging().then(async res => {
      if (res) {
        const fcmToken = await messaging().getToken();
        getToken(fcmToken);
      }
    });
  } catch (e) {
    console.log('FCM_Token_Error', e);
  }
};
const RemoteNavigation = (data: any) => {
  //console.log('Here', data.appointment);
  if (data) {
    const {appointment} = data;
   // appointment && helperNavigate('Appoinment', {item: appointment});
  }
};
export {monthArr, updateMyToken, RemoteNavigation, configure};
