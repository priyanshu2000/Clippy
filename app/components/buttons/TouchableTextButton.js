import React from 'react';
import colors from '../../constants/colors';
import {TouchableOpacity, StyleSheet, Keyboard} from 'react-native';
import AppText from '../AppText';

const TextButton = ({title, color, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.bottomSheetOptionContainer}
      onPress={() => {
        onPress();
        Keyboard.dismiss();
      }}>
      <AppText
        style={[styles.bottomSheetOptionText, {color: color || colors.grey}]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomSheetOptionContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bottomSheetOptionText: {
    fontSize: 16,
  },
});

export default TextButton;
