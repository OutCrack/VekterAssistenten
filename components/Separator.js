import React from "react";
import { StyleSheet, View } from "react-native";

const separator = (props) => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  separator: {
    flex: 1,
    borderColor: "#D3D3D3",
    borderWidth: 0.5,
    marginVertical: 10,
    marginHorizontal: 30,
    marginVertical: 10
  },
});

export default separator;
