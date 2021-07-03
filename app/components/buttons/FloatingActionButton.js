import React from 'react';
import colors from '../../constants/colors';
import Icon from 'react-native-remix-icon';
import {StyleSheet, TouchableOpacity} from 'react-native';

const FAB = ({onPress}) => (
  <TouchableOpacity style={styles.floatingButton} onPress={() => onPress()}>
    <Icon name="add-fill" size={24} color={colors.white} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  floatingButton: {
    width: 57.5,
    height: 57.5,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    bottom: 25,
    right: 20,
    zIndex: 1000,
  },
});

export default FAB;
