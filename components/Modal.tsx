import React, {ReactNode, forwardRef} from 'react';
import {ModalView, UIBlurEffectStyles} from 'react-native-ios-modal';
import {Modal, Platform} from 'react-native';
const MyModal = forwardRef(
  (
    {
      children,
      visible = false,
      transparent = false,
      onRequestClose = () => true,
      animationType = 'fade',
    }: {
      children: ReactNode;
      visible?: boolean;
      transparent?: boolean;
      onRequestClose: Function;
      animationType?: 'fade' | 'none' | 'slide' | undefined;
    },
    ref,
  ) => {
    return Platform.OS === 'android' ? (
      <Modal
        visible={visible}
        transparent={transparent}
        onRequestClose={() => onRequestClose()}
        animationType={animationType}>
        {children}
      </Modal>
    ) : (
      <ModalView
        ref={ref}
        isModalBGBlurred={false}
        isModalBGTransparent={false}
        modalBGBlurEffectStyle={UIBlurEffectStyles.light}>
        {children}
      </ModalView>
    );
  },
);
export default MyModal;
