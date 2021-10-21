import React, {Fragment} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
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

const Stack = createStackNavigator();

const MainNavigator = () => {
  const {loggedIn} = useSelector(({USER}) => USER);
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
