import React from "react";
import { TextInput, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const authInput = props => (
  <TextInput 
    underlineColorAndroid="transparent"
    textAlign={'center'}
    placeholderTextColor={Colors.secondaryTextLight}
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    fontSize: 16,
    color: Colors.secondaryText,
    backgroundColor: Colors.primarySuperLight,
    borderRadius: 25,
    marginTop: 10,
  },
  invalid: {
    backgroundColor: Colors.invalid
  }
})

export default authInput;