import Toast from 'react-native-toast-message';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-remix-icon';
import colors from '../constants/colors';
import AppText from './AppText';

const ToastMessage = (toastType, toastTitle, toastDescription) => {
  Toast.show({
    type: toastType,
    position: 'bottom',
    text1: toastTitle || toastType.toUpperCase(),
    text2: toastDescription || '',
    bottomOffset: 25,
  });
};

const Icons = {
  error: 'close-circle-fill',
  success: 'checkbox-circle-fill',
};

const ToastBody = ({text1, text2, color, Icons}) => {
  return (
    <View style={styles.mainBody}>
      <View style={[styles.tintColor, {backgroundColor: `${color}`}]} />
      <View style={styles.iconContainer}>
        <View style={styles.container}>
          <Icon name={Icons} size={35} color={color} style={styles.icon} />
          <View>
            <AppText>{text1}</AppText>
            <AppText style={styles.textTwo}>{text2}</AppText>
          </View>
        </View>
        <Icon
          name="close-fill"
          size={20}
          color={colors.Grey}
          onPress={() => Toast.hide()}
        />
      </View>
    </View>
  );
};

export const ToastConfig = {
  error: ({text1, text2}) => (
    <ToastBody
      text1={text1}
      text2={text2}
      color={colors.red}
      Icons={Icons.error}
    />
  ),
  success: ({text1, text2}) => (
    <ToastBody
      text1={text1}
      text2={text2}
      color={colors.green}
      Icons={Icons.success}
    />
  ),
};

const styles = StyleSheet.create({
  mainBody: {
    height: 60,
    width: '92%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  icon: {
    marginHorizontal: 7.5,
  },
  textTwo: {
    color: colors.grey,
  },
  tintColor: {
    borderRadius: 10,
    width: '1%',
    height: '100%',
  },
});

export default ToastMessage;
