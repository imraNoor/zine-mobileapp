import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// useEffect(() => {
//   getData('token').then(userToken => {
//     userToken && setUToken(userToken);
//   }).finally(()=>{  isLoader(false)});
// }, []);



var logo = require('../assets/img/logo.png');
function SplashScreen({navigation}: {navigation: any}) {
  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Valu', value);
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  const [uToken, setUToken] = useState('');
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setTimeout(() => {
  //       navigation.replace('SignIn');
  //     }, 5000);
  //   });

  //   return unsubscribe;
  // }, [navigation]);
  useEffect(() => {
    getData('token')
      .then(userToken => {
        userToken ? setTimeout(() => {
                navigation.replace('BottomTab');
               }, 3000)
               : setTimeout(() => { navigation.replace('SignIn');}, 3000)
      })
      .finally(() => {});
  }, []);
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#008DD5', '#6FBFE8']}
        style={styles.linearGradient}>
        <Image source={logo} />
      </LinearGradient>
    </View>
  );
}
export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
