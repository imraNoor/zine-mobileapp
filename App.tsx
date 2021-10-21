import React,{Fragment} from 'react';
import {StyleSheet,View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './navigation/MainNavigator';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import rootReducer from './redux/rootreducer';
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import {createStore,applyMiddleware,compose} from 'redux';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const Stack = createStackNavigator();
function App() {
  return (
    <Provider store={store}>
      <View style={{flex:1}} >
        <StatusBar translucent={true} backgroundColor="#00000000"/>
        <SafeAreaProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
        </SafeAreaProvider>
        <FlashMessage position="top" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
