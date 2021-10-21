import React, {useState, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import LottieView from 'lottie-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import images from '../constants/images';
function CompainScreen({navigation}: {navigation: any}) {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View style={[styles.mainContainer]}>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{
          zIndex: 10,
          position: 'absolute',
          top: 10 + top,
          left: 10,
          width: 80,
          height: 80,
        }}>
        <Image
          style={{width: 20, height: 20, resizeMode: 'contain'}}
          source={images.backIcon}
        />
      </TouchableOpacity>
      <WebView
        style={{flex: 1}}
        javaScriptEnabled
        userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
        onError={e => {
          console.log('err', e);
        }}
        contentMode="mobile"
        containerStyle={{padding: 0, margin: 0}}
        scalesPageToFit={Platform.OS === 'ios'}
        source={{
          html: `<style>body {width:100%;height:100%;padding:0;margin:0;}</style>
                <iframe 
                webkitallowfullscreen 
                mozallowfullscreen 
                allowfullscreen 
                src='https://app.databox.com/datawall/e2dbba4a726a6b13bfc7909b1fe79dbe06124c5f3?i'
                style='border:0;margin:0,padding:0;width:100%;height:100%'/>`,
        }}
        startInLoadingState={true}
        renderLoading={() => (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              source={require('../assets/lf30_editor_dsl3jbcy.json')}
              style={{width: 150, height: 150}}
              autoPlay
              loop
              speed={1.5}
            />
          </View>
        )}
      />
    </View>
  );
}
export default CompainScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
