import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as salaryProfileActions from "../../store/actions/salaryProfiles";

import Colors from "../../constants/Colors";
import Separator from "../../components/Separator";
import { validSalaryProfileInput } from "../../utility/inputValidation";
import { findSalaryProfile } from "../../utility/databaseValidation";
import InfoModal from "../../components/UI/InfoModal";
import DefaultInput from "../../components/UI/DefaultInput";

const AddSalaryProfileScreen = (props) => {
  const allSP = useSelector((state) => state.salaryProfiles.salaryProfiles);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hourly, setHourly] = useState("");
  const [certificate, setCertificate] = useState("");
  const [nightExtra, setNightExtra] = useState("");
  const [weekendExtra, setWeekendExtra] = useState("");
  const [holidayExtra, setHolidayExtra] = useState("");
  const [monthlyHours, setMonthlyHours] = useState("");
  const [foodMoney, setFoodMoney] = useState("");
  const [functionSupplement, setFunctionSupplement] = useState("");
  const [serviceExtension, setServiceExtension] = useState("");
  const dispatch = useDispatch();

  const [showTitle, setShowTitle] = useState(true);
  const [showHourly, setShowHourly] = useState(true);
  const [showDates, setShowDates] = useState(true);
  const [showExtra, setShowExtra] = useState(true);
  const [showOvertime, setShowOvertime] = useState(true);
  const [showFunctionSupplement, setShowFunctionSupplement] = useState(false);
  const [showServiceExtension, setShowServiceExtension] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const submitHandler = () => {
    if (
      validSalaryProfileInput(
        startDate,
        endDate,
        hourly,
        certificate,
        nightExtra,
        weekendExtra,
        holidayExtra,
        monthlyHours,
        foodMoney,
        functionSupplement,
        serviceExtension
      )
    ) {
      let newStartDateFormat =
        startDate.split(".")[2] +
        "-" +
        startDate.split(".")[1] +
        "-" +
        startDate.split(".")[0];
      let newEndDateFormat =
        endDate.split(".")[2] +
        "-" +
        endDate.split(".")[1] +
        "-" +
        endDate.split(".")[0];
      if (!findSalaryProfile(allSP, newStartDateFormat, newEndDateFormat)) {
        dispatch(
          salaryProfileActions.createSalaryProfile(
            title,
            newStartDateFormat,
            newEndDateFormat,
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
        console.log("no salary profile found");
      } else {
        console.log("salary profile found");
        Alert.alert(
          "Annen lønnsprofil funnet i gitt tidsrom!",
          "Du kan ikke ha to lønnsprofiler som overlapper hverandre.",
          [{ text: "Ok", style: "cancel" }],
          {
            cancelable: true,
          }
        );
      }
    }
  };

  useEffect(() => {
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
  });

  const showModalHandler = (val) => {
    console.log("showModalHandler " + val);
  };

  return (
    <View style={styles.container}>
      <ScrollView alwaysBounceVertical={true}>
        <DefaultInput
          containerTitle="TITTEL & DATO"
          value={[title, startDate, endDate]}
          setValue={[setTitle, setStartDate, setEndDate]}
          icon={["ios-paper-plane", "calendar", "calendar"]}
          textInputLabel={[null, "Fra:", "Til:"]}
          placeholder={["Tittel på profil", "Startdato", "Sluttdato"]}
          showModal={showModalHandler}
          maxLength={[25, 10, 10]}
          visible={true}
        />

        <DefaultInput
          containerTitle="LØNN"
          value={[hourly, monthlyHours, certificate]}
          setValue={[setHourly, setMonthlyHours, setCertificate]}
          icon={["ios-hourglass", null, null]}
          textInputLabel={[null, "Timer i måned:", "Fagbrev:"]}
          placeholder={["Timelønn sats", "Antall timer", "Fagbrev sats"]}
          showModal={showModalHandler}
          maxLength={6}
          visible={true}
        />

        <DefaultInput
          containerTitle="TILLEGG"
          value={[
            nightExtra,
            weekendExtra,
            holidayExtra,
            foodMoney,
            functionSupplement,
            serviceExtension,
          ]}
          setValue={[
            setNightExtra,
            setWeekendExtra,
            setHolidayExtra,
            setFoodMoney,
            setFunctionSupplement,
            setServiceExtension,
          ]}
          icon={[null]}
          textInputLabel={[
            "Natt:",
            "Helg:",
            "Helligdag:",
            "Matpenger:",
            "Funksjonstillegg",
            "Tjenestegrenstillegg",
          ]}
          placeholder={[
            "Natt sats",
            "Helge sats",
            "Helligdag sats",
            "Matpenger sats",
            "Funksjonstillegg sats",
            "Tjenestegrenstillegg sats",
          ]}
          showModal={showModalHandler}
          maxLength={6}
        />
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
    // flexDirection: "row",
    // justifyContent: "space-between"
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
