import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

const popUpMenu = props => (
  <View style={styles.container}>
  <TouchableOpacity
    onPress={props.deletehandler}
    style={styles.rowContainer}
  >
    <Text style={styles.menuText}>Slett</Text>
    <View style={[styles.iconContainer, {backgroundColor: "#F44336"}]}>
      <Ionicons name={"md-close"} size={15} color={Colors.secondaryText} />
    </View>
  </TouchableOpacity>
    <TouchableOpacity
      onPress={props.editHandler}
      style={styles.rowContainer}
    >
      <Text style={styles.menuText}>Rediger</Text>
      <View style={styles.iconContainer}>
        <Ionicons name={"md-create"} size={15} color="black" />
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={props.overtimeHandler}
      style={styles.rowContainer}
    >
      <Text style={styles.menuText}>Overtid</Text>
      <View style={styles.iconContainer}>
        <Ionicons name={"md-add"} size={20} color="black" />
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 85,
    right: 25,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10
  },
  iconContainer: {
    backgroundColor: "#ffb300",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    marginRight: 10,
    color: Colors.primaryText
  }
});

export default popUpMenu;
