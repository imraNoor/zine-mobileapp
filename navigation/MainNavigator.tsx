import React, {Fragment, useEffect} from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/home';
import BottomTabs from './BottomTabs';
import SplashScreen from '../screens/splash';
import SignIn from '../screens/auth/signin';
import SignUp from '../screens/auth/signup';
import CalenderScreen from '../screens/calenderScreen';
import ProfileScreen from '../screens/profileScreen';
import AppointmentScreen from '../screens/appointment';
import CompainScreen from '../screens/compainDashboard';
import CallScreen from '../screens/callScreen';
import MessageScreen from '../screens/messageScreen';
import BuySellScreen from '../screens/buySell';
import {enableScreens} from 'react-native-screens';
import {RemoteNavigation} from '../lib/utilts';
enableScreens(true);
const Stack = createStackNavigator();

const MainNavigator = () => {
  const {loggedIn}: {loggedIn: boolean} = useSelector(({USER}) => USER);
  useEffect(() => {
    PushNotification.popInitialNotification(notification => {});

    if (loggedIn) {
      PushNotification.configure({
        onNotification: ({userInteraction, data, finish}) => {
          finish(PushNotificationIOS.FetchResult.NoData);
          if (userInteraction) {
            setTimeout(() => {
              RemoteNavigation(data);
            }, 1000);
          }
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
      getNotifications();
      const unsubscribe = messaging().onMessage(remoteMessage => {
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
        Platform.OS === 'android' &&
          PushNotification.localNotification({
            autoCancel: false,
            title: remoteMessage.notification?.title,
            message: remoteMessage.notification?.body,
            vibrate: true,
            channelId: 'channel2020',
            vibration: 300,
            playSound: true,
            color: remoteMessage.notification?.android?.color,
            soundName: 'default',
            userInfo: remoteMessage.data,
          });
        Platform.OS === 'ios' &&
          PushNotificationIOS.addNotificationRequest({
            id: new Date().toString(),
            title: remoteMessage.notification?.title,
            body: remoteMessage.notification?.body,
            category: 'userAction',

            userInfo: remoteMessage.data,
          });
      });
      return unsubscribe;
    }
  }, [loggedIn]);
  const getNotifications = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from background state',
          remoteMessage.notification,
        );
      }
    });
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state',
            remoteMessage.notification,
          );
        }
      });
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Spalsh"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      {loggedIn ? (
        <Fragment>
          <Stack.Screen
            name="BottomTab"
            component={BottomTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Calender"
            component={CalenderScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Appoinment"
            component={AppointmentScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Compain"
            component={CompainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CallScreen"
            component={CallScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MessageScreen"
            component={MessageScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BuySellScreen"
            component={BuySellScreen}
            options={{headerShown: false}}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
        </Fragment>
      )}
    </Stack.Navigator>
  );
};
export default MainNavigator;
