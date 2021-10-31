import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Mainheader from '../components/header';
const BuySellScreen = ({navigation}: {navigation: any}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.mainContainer]}>
      <Mainheader title="Buyers & Sellers" navigation={navigation} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.cmSon}>Coming Soon</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cmSon: {color: '#333', fontWeight: 'bold', fontSize: 28},
});
export default BuySellScreen;
