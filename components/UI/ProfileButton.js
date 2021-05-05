import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import Colors from "../../constants/Colors";

const profileButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={props.onItemPressed}
    >
      <View style={styles.btnIconContainer}>
        <Icon size={30} name={props.icon} color={Colors.primaryText} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.rowText}>{props.rowText}</Text>
      </View>
      <View style={styles.arrowIcon}>
        <Icon size={30} name={"md-arrow-forward"} color={Colors.secondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: "100%",
  },
  btnIconContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "70%",
  },
  rowText: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.primaryText,
  },
  arrowIcon: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default profileButton;
