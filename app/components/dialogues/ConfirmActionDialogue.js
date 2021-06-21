import React from 'react';
import colors from '../../constants/colors';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import ActionButton from '../buttons/ActionButton';

const ConfirmActionDialogue = ({heading, isOpen, onCancel, onConfirm}) => {
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
            <Text style={styles.dialogueHeading}>{heading}</Text>
          </View>
          <View style={styles.actionButtonContainer}>
            <ActionButton title="Cancel" onPress={() => onCancel()} />
            <ActionButton
              title="Confirm"
              color={colors.accent}
              titleColor={colors.white}
              onPress={() => onConfirm()}
            />
          </View>
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
    fontSize: 15,
    margin: 7.5,
    fontFamily: 'MediumItalic',
    color: colors.white,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    marginTop: 3.5,
  },
});

export default ConfirmActionDialogue;