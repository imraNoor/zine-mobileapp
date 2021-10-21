/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, View, ActivityIndicator, Text} from 'react-native';
import LottieView from 'lottie-react-native';
const Loader = ({
  visible,
  done = false,
}: {
  visible: boolean;
  done?: boolean;
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000088',
        }}>
        {!done ? (
          <LottieView
            source={require('../assets/lf30_editor_dsl3jbcy.json')}
            style={{width:150,height:150}}
            autoPlay
            loop
          />
        ) : (
          <LottieView
            style={{width:150,height:150}}
            source={require('../assets/lf30_editor_abkcphkp.json')}
            autoPlay
            loop={false}
          />
        )}
      </View>
    </Modal>
  );
};
export default Loader;
