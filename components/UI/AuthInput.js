import React from "react";
import { TextInput, StyleSheet } from "react-native";

const authInput = props => (
  <TextInput 
    underlineColorAndroid="transparent"
    textAlign={'center'}
    placeholderTextColor="gray"
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    fontSize: 16,
    color: "#59566B",
    backgroundColor: "#E3F1FF",
    borderRadius: 25,
    marginTop: 10,
  },
  invalid: {
    backgroundColor: '#f9c0c0'
  }
})

export default authInput;