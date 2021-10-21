/* eslint-disable react-native/no-inline-styles */
import React, {useState, Fragment, ReactNode} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ImageCroper from 'react-native-image-crop-picker';
import TextFamily from '../constants/fontFamily';

const ImageTaker = ({
  children,
  photoSetter = ({
    mime,
    path,
    size,
  }: {
    size: number;
    path: string;
    mime: string;
  }) => {
    console.log('images', {mime, path, size});
  },
}: {
  children: ReactNode;
  photoSetter?: Function;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [modalOn, setModalOn] = useState<boolean>(false);
  const OpenImageGraper = (choose = true) => {
    setModalOn(false);
    setTimeout(() => {
      ImageCroper[`open${choose ? 'Camera' : 'Picker'}`]({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: 'photo',
        smartAlbums: [
          'PhotoStream',
          'Favorites',
          'RecentlyAdded',
          'UserLibrary',
          'SelfPortraits',
          'Screenshots',
        ],
      })
        .then(photoSetter)
        .catch(e => {});
    }, 300);
  };
  return (
    <Fragment>
      <Modal animationType="fade" visible={modalOn} transparent={true}>
        <View
          style={[style.container, {paddingTop: top, paddingBottom: bottom}]}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              setModalOn(false);
            }}
          />
          <View style={style.actionButtonCont}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[style.button, {width: '100%'}]}
              onPress={() => {
                OpenImageGraper();
              }}>
              <Text style={[style.buttonText]}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                OpenImageGraper(false);
              }}
              style={[
                style.button,
                {
                  width: '100%',
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderColor: '#AAA',
                },
              ]}>
              <Text style={[style.buttonText]}>Gallery</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[style.button, {marginTop: 10}]}
            onPress={() => {
              setModalOn(false);
            }}>
            <Text style={[style.buttonText, {color: 'red'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setModalOn(true);
        }}
        style={style.childCont}>
        {children}
      </Pressable>
    </Fragment>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000' + '88',
  },
  actionButtonCont: {
    marginVertical: 5,
    backgroundColor: '#fff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  childCont: {
    //width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: Platform.OS === 'ios' ? 44 : 48,
    alignSelf: 'center',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#008dd5',
    fontSize: Platform.OS === 'ios' ? 16 : 17,
    fontFamily: TextFamily.POPPINS_REGULAR,
  },
});

export default ImageTaker;
