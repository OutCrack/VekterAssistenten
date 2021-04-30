import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
  <TextInput 
    underlineColorAndroid="transparent"
    placeholderTextColor="gray"
    {...props}
    style={[styles.input, props.style]}
  />
);

const styles = StyleSheet.create({
  input: {
    // width: "100%",
    borderWidth: 1,
    height: 40,
    borderColor: "#808080",
    borderRadius: 5,
    padding: 5,
    margin: 8
  }
});

export default defaultInput;