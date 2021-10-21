import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
const logo = require('../assets/img/logo.png');
const SplashScreen = ({navigation}: {navigation: any}) => {
  const {loggedIn} = useSelector(({USER}) => USER);
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(loggedIn ? 'BottomTab' : 'SignIn');
    }, 3000);
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
};
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
