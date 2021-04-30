import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import ShiftListItem from "../../components/ShiftListItem";
import Colors from "../../constants/Colors";

import { Ionicons } from "@expo/vector-icons";

// import { initSalaryProfileDB } from "./helper/salaryProfileDatabase";

const SalaryProfileScreen = (props) => {
  const salaryProfiles = useSelector(
    (state) => state.salaryProfiles.salaryProfiles
  );

  console.log(salaryProfiles);

  return (
    <View style={styles.container}>
      <FlatList
        data={salaryProfiles}
        keyExtractor={(item) => item.id}
        renderItem={(info) => (
          <ShiftListItem
            title={info.item.title}
            // shiftId={info.item.id}
            //shiftDate={info.item.date}
            startTime={info.item.startDate}
            endTime={info.item.endDate}
            overtime={""}
            onItemPressed={(val) =>
              props.navigation.navigate("SalaryProfileDetail", {
                selectedSalaryProfile: info.item,
              })
            }
          />
        )}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Salary Profiles",
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerRightBtn}
        onPress={() => navData.navigation.navigate("AddSalaryProfile")}
      >
        <Ionicons
          name={Platform.OS === "android" ? "md-add" : "ios-add"}
          size={35}
          color={"#fff"}
        />
      </TouchableOpacity>
    ),
    headerStyle: { backgroundColor: Colors.primaryDark },
    headerTintColor: "#fff",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryLight
  },
  headerRightBtn: {
    marginRight: 10,
    marginLeft: 5,
  },
});

export default SalaryProfileScreen;
