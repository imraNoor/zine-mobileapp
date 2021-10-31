import React, {Fragment} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import CalenderScreen from '../screens/calenderScreen';
import ProfileScreen from '../screens/profileScreen';
import fontFamily from '../constants/fontFamily';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import AppointmentScreen from '../screens/appointment';
import images from '../constants/images';
import CompainScreen from '../screens/compainDashboard';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CallScreen from '../screens/callScreen';
import MessageScreen from '../screens/messageScreen';

const Tab = createBottomTabNavigator();

var message = require('../assets/img/message.png');
var profile = require('../assets/img/profile.png');

const MainNavigator = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      tabBar={props => <TabBar {...props} bottom={bottom} />}
      screenOptions={{
        tabBarShowLabel: false,
      }}
      activeColor="#008DD5"
      inactiveColor="#979797"
      initialRouteName="Home">
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? message : message}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calender"
        component={CalenderScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? images.appointmentSelect : images.appointment}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Image source={message} style={{width: 20, height: 20}} />
          ),
        }}
      />
      <Tab.Screen
        name="Call"
        component={CallScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? images.call : images.call}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <Image
              source={focused ? images.profileSelected : profile}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;

const TabBar = ({
  state,
  descriptors,
  navigation,
  bottom = 0,
}: {
  bottom?: number;
  navigation: object;
  descriptors: object;
  state: object;
}) => {
  const {tabBarVisible} = descriptors[state.routes[state.index].key].options;
  if (tabBarVisible === false) {
    return null;
  }
  return (
    <Fragment>
      <TouchableOpacity
        activeOpacity={0.95}
        accessibilityRole="button"
        onPress={() => {
          const isFocused = state.index === 2;
          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes[2].key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate('Home');
          }
        }}
        onLongPress={() => {
          navigation.emit({
            type: 'tabLongPress',
            target: state.routes[2].key,
          });
        }}
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'android' ? 32 : bottom + 32,
          right: wp(50) - 32,
          width: 64,
          height: 64,
          borderRadius: 32,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 200,
        }}>
        <Image
          source={images.homeIcon}
          style={{width: 50, height: 50, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          height: Platform.OS === 'android' ? 63 : 63 + bottom,
          paddingBottom: Platform.OS === 'android' ? 0 : bottom,
          width: wp(100),
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
          zIndex: 199,
          borderTopWidth: 1,
          borderColor: '#ddd',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const icon =
            // route.name === 'Appointment'
            //   ? images[`appointment${isFocused ? 'Selected' : ''}`]
            //   : route.name === 'Calender'
            //   ? images.call
            //   : route.name === 'Compain'
            //   ? images[`appointment${isFocused ? 'Selected' : ''}`]
            //   : images[`profile${isFocused ? 'Selected' : ''}`]

            route.name === 'Message'
              ? images[`message${isFocused ? 'Selected' : ''}`]
              : route.name === 'Calender'
              ? images[`appointment${isFocused ? 'Select' : ''}`]
              : route.name === 'Call'
              ? images[`call${isFocused ? 'Selected' : ''}`]
              : images[`profile${isFocused ? 'Selected' : ''}`];

          return index !== 2 ? (
            <TouchableOpacity
              activeOpacity={1}
              key={'_Tab' + index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                //...getShadow(4),
                flex: index === 2 ? 1.5 : 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}>
              <Image
                style={{width: 23, height: 23, resizeMode: 'contain'}}
                source={icon}
              />
            </TouchableOpacity>
          ) : (
            <View
              key={'_Tab' + index}
              style={{
                //...getShadow(4),
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor:index === 2 ? Colors.transparent : Colors.white,
                backgroundColor: '#fff',
              }}
            />
          );
        })}
      </View>
    </Fragment>
  );
};
