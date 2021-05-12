import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const salaryRow = (props) => {
  const rowText = props.title === "Diett v/overtid" ? "Antall:  " : "Timer:  ";

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{props.title}</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowBlock}>
            <Text style={styles.rowText}>{rowText}</Text>
            <Text style={styles.rowText}>{props.hours}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rowBlock}>
        <Text style={styles.earningsText}>
          {props.earnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kr
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  rowBlock: {
    flexDirection: "row",
  },
  rowText: {
    fontSize: 16,
    color: Colors.primaryText,
  },
  earningsText: {
    fontSize: 20,
    color: Colors.primaryText,
    fontWeight: "bold"
  }
});

export default salaryRow;
