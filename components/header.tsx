import * as React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import fontFamily from '../constants/fontFamily';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const backIcon = require('../assets/img/back.png');
function MainHeader({
  navigation = null,
  title = '',
}: {
  navigation?: any;
  title?: string;
}) {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#008DD5', '#6FBFE8']}
        style={[styles.linearGradient, {paddingTop: top, height: 60 + top}]}>
        <View style={{width: 48}}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Image source={backIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.screenTitle}>{title}</Text>
        </View>
        <View style={{width: 48}} />
      </LinearGradient>
    </View>
  );
}
export default MainHeader;

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  screenTitle: {
    color: '#111',
    fontSize: 16,
    fontFamily: fontFamily.POPPINS_REGULAR,
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});
