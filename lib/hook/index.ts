import {useEffect, useState} from 'react';

import {Keyboard, KeyboardEvent} from 'react-native';

const useKeyboard = (): [number] => {
  const [kbHeight, setKbHeight] = useState<number>(0);

  const onKeyboardDidShow = ({
    endCoordinates: {height},
  }: KeyboardEvent): void => {
    setKbHeight(height);
  };

  const onKeyboardDidHide = (): void => {
    setKbHeight(0);
  };

  useEffect(() => {
    const kS = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);

    const kH = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return (): void => {
      kS.remove();

      kH.remove();
    };
  }, []);
  return [kbHeight];
};
export default {useKeyboard};
