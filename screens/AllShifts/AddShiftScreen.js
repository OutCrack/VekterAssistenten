import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

import * as shiftActions from "../../store/actions/shifts";

import Separator from "../../components/Separator";
import { isValidTime } from "../../utility/inputValidation";
import { findShift } from "../../utility/databaseValidation";

const AddShiftScreen = (props) => {
  const allShifts = useSelector((state) => state.shifts.shifts);
  // const { allShifts } = props.route.params;

  const [btnText, setBtnText] = useState("Lagre ny vakt");
  const [id, setId] = useState();
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
    if (props.route.params?.selectedShift) {
      const { selectedShift } = props.route.params;
      setId(selectedShift.id);
      setName(selectedShift.title);
      setShiftID(selectedShift.shiftId.toString());
      setAddress(selectedShift.address);
      setDates([selectedShift.date]);
      setStartTime(selectedShift.startTime);
      setEndTime(selectedShift.endTime);
      setOvertime(selectedShift.overtimePercentage.toString());
      setPaidLunch(selectedShift.paidLunch);
      setNote(selectedShift.note);
      setBtnText("Rediger vakt");
    }
    if (props.route.params?.overtime) {
      setExtra(true);
      setType("overtime");
      setOvertime("100");
      setBtnText("Legg til overtid");
    }
  }, [props.route.params?.selectedShift]);

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
    if (
      name.length < 1 ||
      dates.length < 1 ||
      startTime.length < 1 ||
      endTime.length < 1
    ) {
      Alert.alert(
        "Ikke fylt ut riktig!",
        "Fyll ut minimum title, dato, start tid og slutt tid",
        [{ text: "Ok", style: "cancel" }],
        { cancelable: true }
      );
      return;
    }

    if (btnText === "Lagre ny vakt") {
      dates.forEach((date) => {
        if (!findShift(allShifts, date, startTime, endTime)) {
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
          props.navigation.goBack();
        } else {
          Alert.alert(
            "Kan ikke opprette ny vakt.",
            "En vakt er allerede registret på den dagen i det tidsrommet.",
            [{ text: "Ok", style: "cancel" }],
            { cancelable: true }
          );
        }
      });
    } else if (btnText === "Rediger vakt") {
      // edit shift
      dispatch(
        shiftActions.updateShift(
          id,
          type,
          name,
          shiftID,
          address,
          dates[0],
          startTime,
          endTime,
          overtime,
          paidLunch,
          note
        )
      );
      props.navigation.navigate("ShiftCalendar");
    } else {
      // add overtime
      if (!findShift(allShifts, dates[0], startTime, endTime)) {
        dispatch(
          shiftActions.createShift(
            type,
            name,
            shiftID,
            address,
            dates[0],
            startTime,
            endTime,
            overtime,
            paidLunch,
            note
          )
        );
        props.navigation.navigate("ShiftCalendar");
      } else {
        Alert.alert(
          "Kan ikke opprette ny vakt.",
          "En vakt er allerede registret på den dagen i det tidsrommet.",
          [{ text: "Ok", style: "cancel" }],
          { cancelable: true }
        );
      }
    }
  };

  // Changes 4 digits to XX:XX format
  const timeChangeHandler = (input, type) => {
    switch (type) {
      case "start":
        if (startTime.length == 3 && input.length > startTime.length) {
          const splitString = input.split("");
          if (isValidTime(input)) {
            setStartTime(
              splitString[0] +
                splitString[1] +
                ":" +
                splitString[2] +
                splitString[3]
            );
          } else {
            Alert.alert(
              "Tid ikke gjyldig!",
              "Fyll inn tid på riktig måte.",
              [{ text: "Ok", style: "cancel" }],
              { cancelable: true }
            );
            setStartTime("");
          }
          break;
        }
        setStartTime(input);
        break;
      case "end":
        if (endTime.length == 3 && input.length > endTime.length) {
          const splitString = input.split("");
          if (isValidTime(input)) {
            setEndTime(
              splitString[0] +
                splitString[1] +
                ":" +
                splitString[2] +
                splitString[3]
            );
          } else {
            Alert.alert(
              "Tid ikke gjyldig!",
              "Fyll inn tid på riktig måte.",
              [{ text: "Ok", style: "cancel" }],
              { cancelable: true }
            );
            setEndTime("");
          }
          break;
        }
        setEndTime(input);
        break;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView alwaysBounceVertical={true}>
        <View style={styles.testContainer}>
          <Text style={styles.headerText}>NAVN OG ID</Text>
          <View style={styles.pickerContainer}>
            <View style={[styles.picker, { marginBottom: 5 }]}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-paper-plane"
                  size={30}
                  color={Colors.secondary}
                />
              </View>
              <TextInput
                style={{ width: "100%", fontSize: 18, color: "#fff" }}
                placeholder="Tittel"
                underlineColorAndroid="transparent"
                placeholderTextColor="#808080"
                onChangeText={(text) => setName(text)}
                value={name}
                maxLength={25}
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
                keyboardType="number-pad"
                maxLength={8}
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
                  onChangeText={(text) => timeChangeHandler(text, "start")}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  value={startTime}
                  maxLength={5}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.timePicker}>
                <Text style={[styles.pickerTextLabel, { marginRight: 10 }]}>
                  Til:
                </Text>
                <TextInput
                  style={styles.pickerText}
                  placeholder="00:00"
                  onChangeText={(text) => timeChangeHandler(text, "end")}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  value={endTime}
                  maxLength={5}
                  keyboardType="number-pad"
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
                <Ionicons
                  name="md-location"
                  size={30}
                  color={Colors.secondary}
                />
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
                        color: Colors.secondary,
                      },
                    ]}
                  >
                    Overtid ( % )
                  </Text>
                </View>
                <TextInput
                  style={{ width: "100%", fontSize: 18, color: "#fff" }}
                  placeholder="Overtidsprosent"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  value={overtime}
                  onChangeText={(text) => setOvertime(text)}
                  maxLength={3}
                  keyboardType="number-pad"
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
          <Text style={styles.btnText}>{btnText}</Text>
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
