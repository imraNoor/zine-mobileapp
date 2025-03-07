import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Mainheader from '../components/header';
const CallScreen = ({navigation}: {navigation: any}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.mainContainer]}>
      <Mainheader title="Call" navigation={navigation} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 28}}>
          Coming Soon
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default CallScreen;
