import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import * as salaryProfileActions from "../../store/actions/salaryProfiles";
import Colors from "../../constants/Colors";
import Separator from "../../components/Separator";

const AddSalaryProfileScreen = (props) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [hourly, setHourly] = useState("");
  const [nightExtra, setNightExtra] = useState("");
  const [weekendExtra, setWeekendExtra] = useState("");
  const [holidayExtra, setHolidayExtra] = useState("");
  const [monthlyHours, setMonthlyHours] = useState("");
  const [foodMoney, setFoodMoney] = useState("");
  const [functionSupplement, setFunctionSupplement] = useState("");
  const [serviceExtension, setServiceExtension] = useState("");
  const [certificate, setCertificate] = useState("");
  const dispatch = useDispatch();

  const [showTitle, setShowTitle] = useState(true);
  const [showHourly, setShowHourly] = useState(true);
  const [showDates, setShowDates] = useState(true);
  const [showExtra, setShowExtra] = useState(true);
  const [showOvertime, setShowOvertime] = useState(true);
  const [showFunctionSupplement, setShowFunctionSupplement] = useState(false);
  const [showServiceExtension, setShowServiceExtension] = useState(false);

  const submitHandler = () => {
    // console.log(title);
    dispatch(
      salaryProfileActions.createSalaryProfile(
        title,
        startDate,
        endDate,
        hourly,
        nightExtra,
        weekendExtra,
        holidayExtra,
        monthlyHours,
        foodMoney,
        functionSupplement,
        serviceExtension,
        certificate
      )
    );
    props.navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  props.navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity style={styles.headerRightBtn} onPress={submitHandler}>
        <Ionicons
          name={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
          size={35}
          color={"#fff"}
        />
      </TouchableOpacity>
    ),
  });

  const showHandler = (type) => {
    switch(type){
      case "title":
        setShowTitle(!showTitle);
    }
  };

  const showTitleHandler = () => {
    showHandler("title");
  }

  return (
    <View style={styles.container}>
      <ScrollView alwaysBounceVertical={true}>
        <View style={styles.testContainer}>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={showTitleHandler}
          >
            <Text
              style={[
                styles.headerText,
                title ? { color: Colors.secondary } : null,
              ]}
            >
              TITTEL
            </Text>
            <Ionicons
              name={showTitle ? "ios-arrow-up" : "ios-arrow-down"}
              size={20}
              color={title ? Colors.secondary : Colors.primaryText}
            />
          </TouchableOpacity>
          {showTitle ? (
            <View style={styles.pickerContainer}>
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="ios-paper-plane"
                    size={30}
                    color={Colors.secondary}
                  />
                </View>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Tittel"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setTitle(text)}
                />
              </View>
            </View>
          ) : null}
        </View>
        <View style={styles.testContainer}>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={() => setShowDates(!showDates)}
          >
            <Text
              style={[
                styles.headerText,
                startDate && endDate ? { color: Colors.secondary } : null,
              ]}
            >
              DATO
            </Text>
            <Ionicons
              name={showDates ? "ios-arrow-up" : "ios-arrow-down"}
              size={20}
              color={
                startDate && endDate ? Colors.secondary : Colors.primaryText
              }
            />
          </TouchableOpacity>
          {showDates ? (
            <View style={styles.pickerContainer}>
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="md-calendar"
                    size={30}
                    color={Colors.secondary}
                  />
                </View>
                <Text style={[styles.pickerLabelText, { marginRight: 10 }]}>
                  Fra:
                </Text>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Startdato"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setStartDate(text)}
                />
                {/* <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  mode={"date"}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                /> */}
              </View>
              <Separator />
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="md-calendar"
                    size={30}
                    color={Colors.secondary}
                  />
                </View>
                <Text style={[styles.pickerLabelText, { marginRight: 10 }]}>
                  Til:
                </Text>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Sluttdato"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setEndDate(text)}
                />
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.testContainer}>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={() => setShowHourly(!showHourly)}
          >
            <Text
              style={[
                styles.headerText,
                hourly ? { color: Colors.secondary } : null,
              ]}
            >
              TIMEL??NN
            </Text>
            <Ionicons
              name={showHourly ? "ios-arrow-up" : "ios-arrow-down"}
              size={20}
              color={hourly ? Colors.secondary : Colors.primaryText}
            />
          </TouchableOpacity>
          {showHourly ? (
            <View style={styles.pickerContainer}>
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="ios-hourglass"
                    size={30}
                    color={Colors.secondary}
                  />
                </View>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Timesl??nn sats"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setHourly(text)}
                />
              </View>
              <Separator />
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Text style={styles.pickerLabelText}>Vekterfagbrev:</Text>
                </View>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Vekterfagbrev sats"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setCertificate(text)}
                />
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.testContainer}>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={() => setShowExtra(!showExtra)}
          >
            <Text
              style={[
                styles.headerText,
                nightExtra && weekendExtra && holidayExtra
                  ? { color: Colors.secondary }
                  : null,
              ]}
            >
              TILLEGG
            </Text>
            <Ionicons
              name={showExtra ? "ios-arrow-up" : "ios-arrow-down"}
              size={20}
              color={
                nightExtra && weekendExtra && holidayExtra
                  ? Colors.secondary
                  : Colors.primaryText
              }
            />
          </TouchableOpacity>
          {showExtra ? (
            <View style={styles.pickerContainer}>
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Text style={styles.pickerLabelText}>Natt:</Text>
                </View>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Nattillegg sats"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setNightExtra(text)}
                />
              </View>
              <Separator />
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Text style={styles.pickerLabelText}>Helg:</Text>
                </View>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Helgetillegg sats"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setWeekendExtra(text)}
                />
              </View>
              <Separator />
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Text style={styles.pickerLabelText}>Helligdag:</Text>
                </View>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Helgetillegg sats"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setHolidayExtra(text)}
                />
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.testContainer}>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={() => setShowOvertime(!showOvertime)}
          >
            <Text
              style={[
                styles.headerText,
                monthlyHours && foodMoney ? { color: Colors.secondary } : null,
              ]}
            >
              OVERTID
            </Text>
            <Ionicons
              name={showOvertime ? "ios-arrow-up" : "ios-arrow-down"}
              size={20}
              color={
                monthlyHours && foodMoney
                  ? Colors.secondary
                  : Colors.primaryText
              }
            />
          </TouchableOpacity>
          {showOvertime ? (
            <View style={styles.pickerContainer}>
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Text style={styles.pickerLabelText}>Timer i m??ned:</Text>
                </View>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Timer i m??ned"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setMonthlyHours(text)}
                />
              </View>
              <Separator />
              <View style={styles.picker}>
                <View style={styles.iconContainer}>
                  <Text style={styles.pickerLabelText}>Matpenger:</Text>
                </View>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Matpenger sats"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setFoodMoney(text)}
                />
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.testContainer}>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={() => setShowFunctionSupplement(!showFunctionSupplement)}
          >
            <Text
              style={[
                styles.headerText,
                functionSupplement ? { color: Colors.secondary } : null,
              ]}
            >
              FUNKSJONSTILLEGG
            </Text>
            <Ionicons
              name={showFunctionSupplement ? "ios-arrow-up" : "ios-arrow-down"}
              size={20}
              color={functionSupplement ? Colors.secondary : Colors.primaryText}
            />
          </TouchableOpacity>

          {showFunctionSupplement ? (
            <View style={styles.pickerContainer}>
              <View style={styles.picker}>
                <TextInput
                  style={{ width: "80%", fontSize: 18, color: "#fff" }}
                  placeholder="Funksjonstillegg sats"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setFunctionSupplement(text)}
                />
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.testContainer}>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={() => setShowServiceExtension(!showServiceExtension)}
          >
            <Text
              style={[
                styles.headerText,
                serviceExtension ? { color: Colors.secondary } : null,
              ]}
            >
              TJENESTEGRENSTILLEGG
            </Text>
            <Ionicons
              name={showServiceExtension ? "ios-arrow-up" : "ios-arrow-down"}
              size={20}
              color={serviceExtension ? Colors.secondary : Colors.primaryText}
            />
          </TouchableOpacity>
          {showServiceExtension ? (
            <View style={styles.pickerContainer}>
              <View style={styles.picker}>
                <TextInput
                  style={{ width: "100%", fontSize: 18, color: "#fff" }}
                  placeholder="Tjenestegrenstillegg sats"
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#808080"
                  onChangeText={(text) => setServiceExtension(text)}
                />
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  headerRightBtn: {
    marginRight: 10,
    marginLeft: 5,
  },
  testContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 10,
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
  iconContainer: {
    marginRight: 15,
  },
  pickerLabelText: {
    fontSize: 18,
    color: Colors.secondary,
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
});

export default AddSalaryProfileScreen;
