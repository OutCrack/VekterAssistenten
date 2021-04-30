import React from "react";
import { StyleSheet, View } from "react-native";

const separator = () => (
  <View style={styles.conatiner}>
    <View style={styles.separator}/>
  </View>
)

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row"
  },

  separator: {
    flex: 0.95,
    flexDirection: "row",
    borderColor: "#D3D3D3",
    borderWidth: 0.8,
    margin: 5
  }
})

export default separator;