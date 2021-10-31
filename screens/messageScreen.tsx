import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import LottieView from 'lottie-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MessageScreen = () => {
  const {top, bottom} = useSafeAreaInsets();
  useEffect(() => {
    //StatusBar.setBackgroundColor('#008dd5');
  }, []);
  return (
    <View
      style={[
        styles.mainContainer,
        {paddingBottom: 63 + 25 + bottom, paddingTop: top},
      ]}>
      <WebView
        style={{flex: 1}}
        javaScriptEnabled
        userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
        onError={e => {
          //  console.log('err', e);
        }}
        contentMode="mobile"
        containerStyle={{padding: 0, margin: 0}}
        scalesPageToFit={Platform.OS === 'ios'}
        source={{
          html: `<style>body {width:100%;height:100%;padding:0;margin:0;}</style>
                <iframe webkitallowfullscreen mozallowfullscreen allowfullscreen src='https://zine.accrualhub.com/public/chat/' style='border:0;margin:0,padding:0;width:100%;height:100%'></iframe>`,
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
            />
          </View>
        )}
      />
    </View>
  );
};
export default MessageScreen;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
