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

const SalaryProfileScreen = (props) => {
  const salaryProfiles = useSelector(
    (state) => state.salaryProfiles.salaryProfiles
  );
  // console.log(salaryProfiles);
  return (
    <View style={styles.container}>
      <FlatList
        data={salaryProfiles}
        keyExtractor={(item) => item.id}
        renderItem={(info) => (
          <ShiftListItem
            title={info.item.title}
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
        ListEmptyComponent={
          <View style={styles.noItem}>
            <Text style={styles.noItemText}>Ingen lønnsprofiler registrert</Text>
          </View>
        }
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Mine lønnsprofiler",
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
  noItem: {
    alignItems: "center",
    marginTop: 40,
  },
  noItemText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#C0C0C0",
  },
});

export default SalaryProfileScreen;
