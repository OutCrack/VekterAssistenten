import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as shiftsActions from "../../store/actions/shifts";
import * as salaryProfileActions from "../../store/actions/salaryProfiles";

import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

import ListItem from "../../components/ShiftListItem";
import Colors from "../../constants/Colors";
import PopUpMenu from "../../components/UI/PopUpMenu";

const AllShiftsScreen = (props) => {
  const allShifts = useSelector((state) => state.shifts.shifts);
  const allSalaryProfiles = useSelector(
    (state) => state.salaryProfiles.salaryProfiles
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shiftsActions.loadShifts("SELECT * FROM shifts"));
    dispatch(
      salaryProfileActions.loadSalaryProfiles("SELECT * FROM salaryProfiles")
    );
  }, [dispatch]);

  const [shiftsDay, setShiftsDay] = useState([]);
  const [markedDates, setMarkedDates] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [monthShowing, setMonthShowing] = useState();
  const [showWeekNumbers, setShowWeekNumbers] = useState(true);
  const [hideExtraDays, setHideExtraDays] = useState(true);
  const [salaryButton, setSalaryButton] = useState(
    allSalaryProfiles.length > 0 ? true : false
  );
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // console.log("Amount of Shifts: " + allShifts.length);
    // console.log("Amount of SalaryProfiles: " + salaryProfiles.length);
    // let dates = [];
    // let overtime = [];
    let combined = {};
    // allShifts.forEach((element) => {
    //   if(element.type === "normal") {
    //     dates.push(element.date);
    //   } else if (element.type === "overtime") {
    //     overtime.push(element.date);
    //     console.log("overtime found")
    //   }

    // });

    const overtimeMark = {
      key: "overtime",
      color: "red",
      selectedDotColot: "red",
    };

    allShifts.forEach((item) => {
      // console.log(item.type);
      if(item.type === "overtime") {
        combined[item.date] = {
          selected: true,
          dots: [overtimeMark]
        }
      } else {
        combined[item.date] = {
          selected: true
        }
      }
    });

    // 
    // --- THIS IS DEPRICATED --- SEE LINE 71
    //
    // for (let i = 0; i < dates.length; i++) {
    //   for (let y = 0; y < overtime.length; y++) {
    //     if (dates[i] === overtime[y]) {
    //       combined[dates[i]] = {
    //         selected: true,
    //         dots: [overtimeMark],
    //       };
    //       y = overtime.length;
    //     }
    //   }
    //   if (combined[dates[i]] == null) {
    //     combined[dates[i]] = {
    //       selected: true,
    //     };
    //   }
    // }

    setMarkedDates(combined);

    let shifts = [];
    let today = new Date();
    let MyDateString =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);

    setDateSelected(MyDateString);
    setMonthShowing(today.getMonth() + 1);

    allShifts.forEach((element) => {
      if (element.date === MyDateString) {
        shifts.push(element);
      }
    });

    if (shifts.length > 1) {
      for (let i = 0; i < shifts.length; i++) {
        const element = shifts[i];
        if (
          i !== shifts.length - 1 &&
          element.startTime > shifts[i + 1].startTime
        ) {
          shifts[i] = shifts[i + 1];
          shifts[i + 1] = element;
        }
      }
    }

    setShiftsDay(shifts);
  }, [allShifts]);

  const onDatePressHandler = (datePressed) => {
    let date = datePressed.dateString; // YYYY-MM-DD
    let shifts = [];
    if (dateSelected !== date) {
      allShifts.forEach((element) => {
        if (element.date === date) {
          shifts.push(element);
        }
      });

      if (shifts.length > 1) {
        for (let i = 0; i < shifts.length; i++) {
          const element = shifts[i];
          if (
            i !== shifts.length - 1 &&
            element.startTime > shifts[i + 1].startTime
          ) {
            shifts[i] = shifts[i + 1];
            shifts[i + 1] = element;
          }
        }
      }
      setShiftsDay(shifts);
      setDateSelected(date);
    }
  };

  const changeMonth = (newMonth) => {
    setMonthShowing(
      newMonth.month.length > 1 ? newMonth.month : "0" + newMonth.month
    );
    let date =
      newMonth.year +
      "-" +
      (newMonth.month.length > 1 ? newMonth.month : "0" + newMonth.month) +
      "-01";
    let shifts = [];
    allShifts.forEach((element) => {
      if (element.date === date) {
        shifts.push(element);
      }
    });

    if (shifts.length > 1) {
      for (let i = 0; i < shifts.length; i++) {
        const element = shifts[i];
        if (
          i !== shifts.length - 1 &&
          element.startTime > shifts[i + 1].startTime
        ) {
          shifts[i] = shifts[i + 1];
          shifts[i + 1] = element;
        }
      }
    }
    setShiftsDay(shifts);
    setDateSelected(date);
  };

  const deleteHandler = () => {
    // console.log("Delete  id: " + selectedShift.id)
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

  props.navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => props.navigation.navigate("Profile")}
      >
        <Ionicons
          name={Platform.OS === "android" ? "md-person" : "ios-person"}
          size={35}
          color={"#fff"}
        />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => {
          // console.log("Alle skifts: " + allShifts.length);
          if (allSalaryProfiles.length > 0) {
            props.navigation.navigate("Salary", {
              month: monthShowing,
            });
          } else {
            // console.log(allShifts);
            Alert.alert(
              "Ingen lønnsprofil er opprettet.",
              "Ønsker du å opprette en lønnsprofil?",
              [
                { text: "Nei", style: "cancel" },
                {
                  text: "Ja",
                  onPress: () => {
                    props.navigation.navigate("AddSalaryProfile");
                  },
                },
              ],
              { cancelable: true }
            );
          }
        }}
      >
        <Ionicons
          name={Platform.OS === "android" ? "md-cash" : "ios-cash"}
          size={35}
          color={"#fff"}
        />
      </TouchableOpacity>
    ),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        onDayPress={onDatePressHandler}
        onDayLongPress={(day) =>
          props.navigation.navigate("AddShift", {
            dateSelected: [day.dateString],
          })
        }
        firstDay={1}
        markedDates={markedDates}
        markingType={"multi-dot"}
        showWeekNumbers={showWeekNumbers}
        hideExtraDays={hideExtraDays}
        onMonthChange={changeMonth}
        theme={calendarTheme}
      />
      <FlatList
        data={shiftsDay}
        keyExtractor={(item) => item.id}
        renderItem={(info) => (
          <ListItem
            title={info.item.title}
            shiftId={info.item.shiftId}
            startTime={info.item.startTime}
            endTime={info.item.endTime}
            overtime={info.item.percentage}
            onItemPressed={() =>
              props.navigation.navigate("ShiftDetail", {
                selectedShift: info.item,
              })
            }
            onItemLongPressed={() => {
              console.log("onItemLongPressed");
              // setShowMenu(true);
            }}
          />
        )}
        ListEmptyComponent={
          <View style={styles.noItem}>
            <Text style={styles.noItemText}>Ingen vakt</Text>
          </View>
        }
      />
      {/* {showMenu ? (
        <PopUpMenu
          deletehandler={() => deleteHandler()}
          editHandler={() =>
            props.navigation.navigate("AddShift", {
              selectedShift: selectedShift,
            })
          }
          overtimeHandler={() =>
            props.navigation.navigate("AddShift", {
              selectedShift: selectedShift,
              overtime: true,
            })
          }
        />
      ) : null} */}
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("AddShift")
        }
        style={styles.addShiftButton}
      >
        <Ionicons name={"md-add"} size={30} color="#052055" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
  },
  headerBtn: {
    marginRight: 10,
    marginLeft: 10,
  },
  noItem: {
    alignItems: "center",
    marginTop: 40,
  },
  noItemText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#C0C0C0",
  },
  addShiftButton: {
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
});

const calendarTheme = {
  backgroundColor: Colors.primaryDark, // ??
  calendarBackground: Colors.primary, // Background for calendar
  textSectionTitleColor: "#fff", // Navn på dager
  textSectionTitleDisabledColor: Colors.secondary, // ??
  selectedDayBackgroundColor: Colors.secondary,
  selectedDayTextColor: "#000",
  todayTextColor: "#fff",
  dayTextColor: "#808080",
  textDisabledColor: "#fff", // Ukedager
  // dotColor: "#00adf5",
  // selectedDotColor: "#ffffff",
  arrowColor: Colors.secondary,
  // disabledArrowColor: "#d9e1e8",
  monthTextColor: "#fff",
  // indicatorColor: "blue",
};

export default AllShiftsScreen;
