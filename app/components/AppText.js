import React from 'react';
import {Text, StyleSheet} from 'react-native';

const AppText = (props) => {
  return <Text style={[textStyles.text, props.style]}>{props.children}</Text>;
};

export const textStyles = StyleSheet.create({
  text: {
    fontFamily: 'Italic',
    fontWeight: '400',
  },
});

export default AppText;
