import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import * as shiftsActions from "../../store/actions/shifts";
import Ionicons from "@expo/vector-icons/Ionicons";
import PopUpMenu from "../../components/UI/PopUpMenu";
import Colors from "../../constants/Colors";

const ShiftDetailScreen = (props) => {
  const { selectedShift } = props.route.params;
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const deleteHandler = () => {
    console.log("Delete  id: " + selectedShift.id)
    Alert.alert(
      "",
      "Ønsker du å slette denne vakten?",
      [
        { text: "Nei", style: "cancel" },
        {
          text: "Slett",
          onPress: () => {
            dispatch(shiftsActions.deleteShift(selectedShift.id));
            props.navigation.navigate("ShiftCalendar");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <View style={styles.mapContainer}>
          <Text>Map</Text>
        </View> */}
        <View style={styles.headerContainer}>
          <Text style={styles.shiftName}>{selectedShift.title}</Text>
          <View style={styles.addressContainer}>
            <Ionicons size={16} name="md-pin" color={Colors.secondary} />
            <Text style={styles.shiftAddress}>{selectedShift.address}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.rowContainer}>
          <Text style={[styles.text, { color: Colors.secondary }]}>ID:</Text>
          <Text style={styles.text}>{selectedShift.shiftId}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.rowContainer}>
          <Ionicons size={24} name="md-time" color={Colors.secondary} />
          <Text style={styles.text}>
            {selectedShift.startTime} - {selectedShift.endTime}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Ionicons size={24} name="md-calendar" color={Colors.secondary} />
          <Text style={styles.text}>{selectedShift.date}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.rowContainer}>
          <Ionicons size={24} name="md-nutrition" color={Colors.secondary} />
          <Text style={styles.text}>
            {selectedShift.paidLunch === true
              ? "Betalt lunsjpause"
              : " Ikke betalt lunsjpause"}
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.pickerText}>%</Text>
          <Text style={styles.text}>{selectedShift.overtimePercentage} % Overtid</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.rowContainer}>
          <View style={{ marginRight: 10 }}>
            <Ionicons size={24} name="md-text" color={Colors.secondary} />
          </View>
          <Text style={styles.textNote}>{selectedShift.note}</Text>
        </View>
      </ScrollView>
      {showMenu ? (
        <PopUpMenu
          deletehandler={() => deleteHandler()}
          editHandler={() => props.navigation.navigate("AddShift", {
            selectedShift: selectedShift
          })}
          overtimeHandler={() => props.navigation.navigate("AddShift", {
            selectedShift: selectedShift,
            overtime: true
          })}
        />
      ) : null}
      <TouchableOpacity
        onPress={() => setShowMenu(!showMenu)}
        style={styles.moreButton}
      >
        <Ionicons name={"ios-ellipsis-horizontal"} size={30} color="#052055" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  mapContainer: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: Colors.primaryLight,
    width: "100%",
    height: 120,
  },
  headerContainer: {
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  addressContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  shiftName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
    color: Colors.primaryText,
  },
  shiftAddress: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.primaryText,
    marginLeft: 9,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.primaryText,
  },
  textNote: {
    fontSize: 20,
    color: Colors.primaryText,
  },
  separator: {
    borderColor: Colors.primaryText,
    borderWidth: 0.5,
    marginBottom: 5,
    marginTop: 5,
    marginHorizontal: 10
  },
  headerBtn: {
    marginRight: 10,
  },
  moreButton: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "#ffb300",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
  },
  pickerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: Colors.secondary,
  },
});

export default ShiftDetailScreen;
