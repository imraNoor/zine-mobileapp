import React, {useEffect} from 'react';
import {View, StatusBar,Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import MainNavigator from './navigation/MainNavigator';
import {navigationRef} from './navigation/navHelper';
import PushNotification, {Importance} from 'react-native-push-notification';

// import rootReducer from './redux/rootreducer';
// import thunk from 'redux-thunk';
// import {createStore, applyMiddleware, compose} from 'redux';
import {Store, persistor} from './_redux';

//const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const App = () => {
  useEffect(() => {
    Platform.OS === 'android' &&
      PushNotification.createChannel(
        {
          channelId: 'channel2020', // (required)
          channelName: 'messageCahnnel', // (required)
          playSound: false, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor="#00000000" />
      <SafeAreaProvider>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer ref={navigationRef}>
              <MainNavigator />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
      <FlashMessage position="top" />
    </View>
  );
};

export default App;
