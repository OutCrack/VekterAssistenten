import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

import * as shiftActions from "../../store/actions/shifts";

// import ShiftInput from "../../components/ShiftInput";
import Separator from "../../components/Separator";

const AddShiftScreen = (props) => {
  const [type, setType] = useState("normal");
  const [name, setName] = useState("");
  const [shiftID, setShiftID] = useState("");
  const [address, setAddress] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState("Velg dato(er)");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [overtime, setOvertime] = useState("0");
  const [paidLunch, setPaidLunch] = useState(true);
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  const [extra, setExtra] = useState(false);

  useEffect(() => {
    if(props.route.params?.selectedShift){
      const { selectedShift } = props.route.params;
      setName(selectedShift.title);
      setShiftID(selectedShift.shiftId.toString());
      setDates([...dates, selectedShift.date]);
      setStartTime(selectedShift.startTime);
      setEndTime(selectedShift.endTime);
      setAddress(selectedShift.address);
    }
    if(props.route.params?.overtime){
      setExtra(true);
      setType("overtime");
      setOvertime("100");
    }
  }, [props.route.params?.selectedShift])


  useEffect(() => {
    if (props.route.params?.dateSelected) {
      setDates(props.route.params?.dateSelected);
    }
    if (dates.length > 1) {
      setSelectedDates(dates[0] + " ...");
    } else if (dates.length > 0) {
      setSelectedDates(dates);
    } else {
      setSelectedDates("Velg dato(er)");
    }
  }, [props.route.params?.dateSelected, dates]);

  const submitHandler = () => {
    console.log("AddShift: SubmitHandler()");
    dates.forEach((date) => {
      dispatch(
        shiftActions.createShift(
          type,
          name,
          shiftID,
          address,
          date,
          startTime,
          endTime,
          overtime,
          paidLunch,
          note
        )
      );
    });
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView alwaysBounceVertical={true}>
        <View style={styles.testContainer}>
          <Text style={styles.headerText}>NAVN OG ID</Text>
          <View style={styles.pickerContainer}>
            <View style={[styles.picker, { marginBottom: 5 }]}>
              <View style={styles.iconContainer}>
                <Ionicons name="ios-paper-plane" size={30} color={Colors.secondary} />
              </View>
              <TextInput
                style={{ width: "100%", fontSize: 18, color: "#fff" }}
                placeholder="Tittel"
                underlineColorAndroid="transparent"
                placeholderTextColor="#808080"
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>
            <Separator />
            <View style={[styles.picker, { marginTop: 5 }]}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-keypad"
                  size={30}
                  color={Colors.secondary}
                />
              </View>
              <TextInput
                style={{ width: "100%", fontSize: 18, color: "#fff" }}
                placeholder="Vakt ID"
                underlineColorAndroid="transparent"
                placeholderTextColor="#808080"
                onChangeText={(text) => setShiftID(text)}
                value={shiftID}
              />
            </View>
          </View>
        </View>

        <View style={styles.testContainer}>
          <Text style={styles.headerText}>DATO OG TID</Text>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("SelectDate", { dates: dates })
              }
              style={[styles.picker, { marginBottom: 5 }]}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name="md-calendar"
                  size={30}
                  color={Colors.secondary}
                />
              </View>
              <Text
                style={
                  dates.length > 0
                    ? styles.pickerText
                    : [styles.pickerText, { color: "#A9A9A9" }]
                }
              >
                {selectedDates}
              </Text>
            </TouchableOpacity>
            <Separator />
            <View style={[styles.picker, { marginTop: 5 }]}>
              <View style={styles.iconContainer}>
                <Ionicons name="md-time" size={30} color={Colors.secondary} />
              </View>
              <View style={styles.timePicker}>
                <Text style={[styles.pickerTextLabel, { marginRight: 10 }]}>
                  Fra:
                </Text>
                <TextInput
                  style={styles.pickerText}
                  placeholder="00:00"
                  onChangeText={(text) => setStartTime(text)}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  value={startTime}
                />
              </View>
              <View style={styles.timePicker}>
                <Text style={[styles.pickerTextLabel, { marginRight: 10 }]}>
                  Til:
                </Text>
                <TextInput
                  style={styles.pickerText}
                  placeholder="00:00"
                  onChangeText={(text) => setEndTime(text)}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  value={endTime}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.testContainer}>
          <Text style={styles.headerText}>LOKASJON</Text>
          <View style={styles.pickerContainer}>
            <View style={styles.picker}>
              <View style={styles.iconContainer}>
                <Ionicons name="md-location" size={30} color={Colors.secondary} />
              </View>
              <TextInput
                style={{ width: "80%", fontSize: 18, color: "#fff" }}
                placeholder="Adresse"
                underlineColorAndroid="transparent"
                placeholderTextColor="#808080"
                onChangeText={(text) => setAddress(text)}
                value={address}
              />
              <TouchableOpacity onPress={() => console.log("Open Map")}>
                <Ionicons name="md-map" size={30} color={Colors.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.testContainer}>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={() => setExtra(!extra)}
          >
            <Text
              style={[
                styles.headerText,
                overtime ? { color: Colors.secondary } : null,
              ]}
            >
              TILLEGG
            </Text>
            <Ionicons
              name={extra ? "ios-arrow-up" : "ios-arrow-down"}
              size={20}
              color={overtime ? Colors.secondary : Colors.primaryText}
            />
          </TouchableOpacity>
          {extra ? (
            <View style={styles.pickerContainer}>
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Text
                    style={[
                      styles.pickerText,
                      {
                        fontWeight: "800",
                        fontSize: 25,
                        color: Colors.secondary,
                      },
                    ]}
                  >
                    %
                  </Text>
                </View>
                <TextInput
                  style={{ width: "100%", fontSize: 18, color: "#fff" }}
                  placeholder="Overtidsprosent"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  value={overtime}
                  onChangeText={(text) => setOvertime(text)}
                />
              </View>
            </View>
          ) : null}
          {extra ? (
            <TouchableOpacity
              style={[
                styles.pickerContainer,
                {
                  marginTop: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
              onPress={() => setPaidLunch(!paidLunch)}
            >
              <View style={styles.picker}>
                <Text style={styles.pickerText}>Betalt lunsjspause?</Text>
              </View>
              <Ionicons
                name={paidLunch ? "md-checkbox-outline" : "md-square-outline"}
                size={30}
                color={overtime ? Colors.secondary : Colors.primaryText}
              />
            </TouchableOpacity>
          ) : null}
          {extra ? (
            <View style={[styles.pickerContainer, { marginTop: 15 }]}>
              <View style={styles.picker}>
                <TextInput
                  style={{ width: "100%", fontSize: 18, color: "#fff" }}
                  placeholder="Notat"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  value={note}
                  onChangeText={(text) => setNote(text)}
                  multiline={true}
                />
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={submitHandler}
          // disabled={true}
        >
          <Text style={styles.btnText}>Add New Shift</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  subContainer2: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowSubContainer: {
    marginTop: 5,
    width: "48%",
  },
  textInputHeader: {
    fontWeight: "bold",
    marginLeft: 13,
    fontSize: 16,
  },
  btnContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.secondary,
    width: "80%",
    padding: 10,
    margin: 15,
    borderRadius: 25,
  },
  btnText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
    fontSize: 18,
  },
  headerText: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 10,
  },
  testContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
  },
  timePicker: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 15,
  },
  pickerTextLabel: {
    fontSize: 18,
    color: Colors.secondary,
  },
  pickerText: {
    fontSize: 18,
    color: Colors.primaryText,
  },
});

export default AddShiftScreen;
