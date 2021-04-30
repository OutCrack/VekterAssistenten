import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const authButton = props => (
  <TouchableOpacity
    onPress={props.onPressHandler}
    {...props}
    style={[styles.btnAuth, props.style]}
  >
    <Text
      {...props}
      style={[styles.btnText, props.style]}
    >{props.buttonText}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({

})

export default authButton;