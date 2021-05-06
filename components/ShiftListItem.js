import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";

const shiftListItem = (props) => (
  <TouchableOpacity style={styles.container} onPress={props.onItemPressed} onLongPress={props.onItemLongPressed}>
    <View style={styles.shiftIcon}>
      {/* <Icon size={40} name="md-calendar" color={Colors.primaryText} /> */}
      <Text style={styles.dateText}>{props.dayOfMonth}</Text>
    </View>
    <View style={styles.textRow}>
      <View style={styles.shiftNameColumn}>
        <Text style={styles.shiftName}>{props.title}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.shiftIdTimeColumn}>
        <Text style={styles.grayText}>ID: {props.shiftId}</Text>
        <Text style={styles.grayText}>
          Kl: {props.startTime} - {props.endTime}
        </Text>
      </View>
    </View>
    <View style={styles.shiftDetailIcon}>
      <Icon size={40} name="md-arrow-forward" color={Colors.secondary} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.primary,//"white",
    borderColor: Colors.secondary,//"#C0C0C0",
    borderWidth: 2,//0.8,
    borderRadius: 10
  },
  shiftIcon: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    color: Colors.primaryText,
    fontSize: 35,
    fontWeight: "500"
  },
  textRow: {
    flex: 7,
    marginVertical: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  shiftNameColumn: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  shiftName: {
    fontSize: 16,
    color: Colors.primaryText
  },
  grayText: {
    color: Colors.primaryText//"#808080",
  },
  shiftIdTimeColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    //marginLeft: 5
  },
  shiftDetailIcon: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    flex: 0.95,
    flexDirection: "row",
    borderColor: Colors.secondaryLight,
    borderWidth: 0.8,
    margin: 5,
  },
});

export default shiftListItem;
