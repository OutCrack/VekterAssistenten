import React from "react";
import { StyleSheet, View } from "react-native";

const separator = props => (
  <View style={styles.container}>
    <View style={styles.separator}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },

  separator: {
    flex: 1,
    borderColor: "#D3D3D3",
    borderWidth: 0.8,
    marginVertical: 10
  }
})

export default separator;