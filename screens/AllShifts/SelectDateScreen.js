import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const SelectDateScreen = (props) => {
  const { dates } = props.route.params;
  const [selectedDates, setSelectedDates] = useState(dates);
  const [markedDates, setMarkedDated] = useState();
  let combined = {};

  useEffect(() => {
    for (let i = 0; i < selectedDates.length; i++) {
      combined[selectedDates[i]] = {
        selected: true,
      };
    }

    setMarkedDated(combined);
  }, [selectedDates]);

  const onDatePressed = (date) => {
    let foundDate = -1;

    selectedDates.forEach((selectedDate, index) => {
      if (date === selectedDate) {
        foundDate = index;
      }
    });

    if (foundDate === -1) {
      setSelectedDates([...selectedDates, date]);
    } 
    else {
      let newArray = [...selectedDates];
      newArray.splice(foundDate, 1);
      setSelectedDates(newArray);
    }
  };

  props.navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() =>
          props.navigation.navigate("AddShift", { dateSelected: selectedDates })
        }
      >
        <Ionicons name="md-checkmark" size={30} color={Colors.primaryText} />
      </TouchableOpacity>
    ),
  });

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(val) => onDatePressed(val.dateString)}
        firstDay={1}
        markedDates={markedDates}
        showWeekNumbers={true}
        hideExtraDays={true}
        theme={calendarTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  headerButton: {
    marginRight: 15,
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
}

export default SelectDateScreen;
