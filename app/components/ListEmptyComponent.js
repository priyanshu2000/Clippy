import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import colors from '../constants/colors';
import AppText from './AppText';

const ListEmptyComponent = () => {
  return (
    <View style={styles.listEmptyComponentContainer}>
      <AppText style={styles.listEmptyComponentText}>
        No clips! Start by creating a collection using the + button
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  listEmptyComponentContainer: {
    height: Dimensions.get('window').height - 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '20%',
  },
  listEmptyComponentText: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
  },
});

export default ListEmptyComponent;
