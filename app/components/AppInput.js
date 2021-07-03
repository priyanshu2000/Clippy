import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-remix-icon';
import AppText, {textStyles} from './AppText';

const AppInput = ({
  placeHolder,
  onChange,
  value,
  autoFocus,
  heading,
  isEditable,
}) => {
  const [showHint, setShowHint] = useState(value ? true : false);
  const [showError, setShowError] = useState(false);

  const handleInput = (val) => {
    if (val.length !== 0) {
      setShowHint(true);
      setShowError(false);
    } else {
      setShowHint(true);
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.inputHeading}>{heading}</AppText>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={'default'}
          placeholderTextColor={colors.grey}
          placeholder={placeHolder}
          style={[styles.input, textStyles.text]}
          onChangeText={onChange}
          defaultValue={value}
          autoFocus={autoFocus}
          autoCapitalize="words"
          editable={isEditable}
          onChange={(e) => handleInput(e.nativeEvent.text)}
        />
        {showHint && (
          <>
            {showError ? (
              <Icon name="error-warning-line" color="red" size={20} />
            ) : (
              <Icon name="checkbox-circle-line" color="green" size={20} />
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12.5,
    zIndex: 1000,
  },
  inputHeading: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  inputContainer: {
    paddingHorizontal: 10,
    width: '95%',
    flexDirection: 'row',
    backgroundColor: colors.lightGrey,
    margin: 3.5,
    alignItems: 'center',
    height: 40,
    opacity: 0.7
  },
  input: {
    width: '95%',
    color: colors.black,
  },
});

export default AppInput;
