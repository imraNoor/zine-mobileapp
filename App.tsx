import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import MainNavigator from './navigation/MainNavigator';
// import rootReducer from './redux/rootreducer';
// import thunk from 'redux-thunk';
// import {createStore, applyMiddleware, compose} from 'redux';
import {Store, persistor} from './_redux';
//const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const App = () => (
  <View style={{flex: 1}}>
    <StatusBar translucent={true} backgroundColor="#00000000" />
    <SafeAreaProvider>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
    <FlashMessage position="top" />
  </View>
);

export default App;
