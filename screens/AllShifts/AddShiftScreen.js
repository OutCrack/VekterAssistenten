import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
// import * as Notifications from "expo-notifications";
import Colors from "../../constants/Colors";

import * as shiftActions from "../../store/actions/shifts";

import Separator from "../../components/Separator";
import { isValidTime } from "../../utility/inputValidation";
import { findShift } from "../../utility/databaseValidation";

const AddShiftScreen = (props) => {
  const dispatch = useDispatch();
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
  const [favorite, setFavorite] = useState(false);
  const [rutineMin, setRutineMin] = useState("120");

  const [extra, setExtra] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
  // const [paatropp, setPaatropp] = useState(true);
  // const [avtropp, setAvtropp] = useState(true);
  // const [rutine, setRutine] = useState(true);

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

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.headButtonContainer}>
          {/* <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Ionicons
              name={
                paatropp || avtropp || rutine
                  ? "notifications"
                  : "notifications-off"
              }
              size={35}
              color={"#fff"}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => setFavorite(!favorite)}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={35}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  // const triggerNotificationHandler = () => {
  //   console.log("triggerNotificationHandler");
  //   Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Notification",
  //       body: "My first noti",
  //     },
  //     trigger: {
  //       seconds: 5,
  //     },
  //   });
  // };

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
          props.navigation.navigate("ShiftCalendar");
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
      {/* <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalRow}>
              <Text style={styles.modalRowText}>Påtropp</Text>
              <Pressable onPress={() => setPaatropp(!paatropp)}>
                <Ionicons
                  name={paatropp ? "checkbox" : "square-outline"}
                  size={35}
                  color={Colors.secondary}
                />
              </Pressable>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalRowText}>Avtropp</Text>
              <Pressable onPress={() => setAvtropp(!avtropp)}>
                <Ionicons
                  name={avtropp ? "checkbox" : "square-outline"}
                  size={35}
                  color={Colors.secondary}
                />
              </Pressable>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalRowText}>Rutine</Text>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <TextInput
                  style={{ borderColor: Colors.primaryText, color: Colors.primaryText, borderWidth: 0.5, borderRadius: 15, padding: 5, paddingHorizontal: 10, marginRight: 5 }}
                  value={rutineMin}
                  placeholder={"120"}
                  placeholderTextColor="#999999"
                  editable={rutine ? true : false}
                  onChangeText={val => setRutineMin(val)}
                  keyboardType="number-pad"
                  maxLength={3}
                />
                <Text style={styles.modalRowText}>min</Text>
              </View>
              <Pressable onPress={() => setRutine(!rutine)}>
                <Ionicons
                  name={rutine ? "checkbox" : "square-outline"}
                  size={35}
                  color={Colors.secondary}
                />
              </Pressable>
            </View>
            <Pressable
              style={styles.modalBtn}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalBtnText}>Lagre</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
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
          {extra && (
            <View>
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
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => submitHandler()}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "70%",
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: Colors.primaryDark
  },
  modalHeader: {
    padding: 10,
  },
  modalRow: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalRowText: {
    fontSize: 16,
    color: Colors.primaryText
  },
  modalBtn: {
    marginTop: 10,
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: Colors.secondary,
  },
  modalBtnText: {
    fontSize: 16,
    fontWeight: "500",
  },
  headButtonContainer: {
    flexDirection: "row",
  },
  headerBtn: {
    marginRight: 20,
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
    marginBottom: 40,
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
