import React from 'react';
import colors from '../../constants/colors';
import {Modal, View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import AppText from '../AppText';

const Dialogue = ({isOpen, children, heading}) => {
  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}>
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={-200}
        style={styles.modalContainer}>
        <View style={styles.childrenContainer}>
          <View style={styles.headingContainer}>
            <AppText style={styles.dialogueHeading}>{heading}</AppText>
          </View>
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.blackLightFade,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childrenContainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingBottom: 10,
    width: '92.5%',
  },
  headingContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12.5,
  },
  dialogueHeading: {
    fontSize: 18,
    margin: 7.5,
    color: colors.white,
  },
});

export default Dialogue;
