import React from 'react';
import {View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import colors from '../constants/colors';
import AppText from './AppText';

const Header = ({isShowIcons, right, isShowBack}) => {
  const {goBack} = useNavigation();

  if (isShowIcons)
    return (
      <>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.headerContainer}>
          {isShowBack && (
            <TouchableOpacity onPress={() => goBack()} style={styles.backIcon}>
              <Icon name="arrow-left-s-line" size={24} color={colors.white} />
            </TouchableOpacity>
          )}
          <View style={styles.headerTextContainer}>
            <AppText style={styles.headerText}>Clippy</AppText>
          </View>
          {right && <View style={styles.right}>{right}</View>}
        </View>
      </>
    );
  else
    return (
      <>
        <StatusBar backgroundColor={colors.primary} />
        <View style={styles.headerContainer}>
          <View style={styles.headerTextContainer}>
            <AppText style={styles.headerText}>Clippy</AppText>
          </View>
        </View>
      </>
    );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    position: 'relative',
    shadowColor: colors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
    paddingVertical: 15,
    zIndex: 10,
  },
  backIcon: {
    position: 'absolute',
    zIndex: 1,
    marginHorizontal: 5,
  },
  right: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'MediumItalic',
    fontSize: 20,
    color: colors.white,
  },
});

export default Header;
