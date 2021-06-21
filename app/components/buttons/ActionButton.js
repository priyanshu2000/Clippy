import React from 'react';
import colors from '../../constants/colors';
import {Text, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';

const ActionButton = ({title, onPress, color, titleColor}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: color || colors.white}]}
      onPress={() => {
        onPress();
        Keyboard.dismiss();
      }}>
      <Text style={[styles.title, {color: titleColor || colors.accent}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7.5,
    paddingVertical: 3,
    borderColor: colors.accent,
    margin: 7.5,
    borderWidth: 1.5,
  },
  title: {
    margin: 3,
    fontSize: 15,
    fontFamily: 'LightItalic',
  },
});

export default ActionButton;
