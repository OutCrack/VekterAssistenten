import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as salaryProfileActions from "../../store/actions/salaryProfiles";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const SalaryProfileDetailScreen = (props) => {
  const { selectedSalaryProfile } = props.route.params;
  const dispatch = useDispatch();

  const deleteHandler = () => {
    Alert.alert(
      "",
      "Ønsker du å slette denne profilen?",
      [
        { text: "Nei", style: "cancel" },
        {
          text: "Slett",
          onPress: () => {
            dispatch(
              salaryProfileActions.deleteSalaryProfile(selectedSalaryProfile.id)
            );
            props.navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightBtnContainer}>
          <TouchableOpacity
            style={styles.headerRightBtn}
            onPress={() => deleteHandler()}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={35}
              color={"#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerRightBtn}
            onPress={() => {
              props.navigation.navigate("Salary", {
                month: monthShowing,
              });
            }}
          >
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={35}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>Name:</Text>
        <Text style={styles.infoText}>{selectedSalaryProfile.title}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>Start date:</Text>
        <Text style={styles.infoText}>{selectedSalaryProfile.startDate}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>End date:</Text>
        <Text style={styles.infoText}>{selectedSalaryProfile.endDate}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>Hourly:</Text>
        <Text style={styles.infoText}>{selectedSalaryProfile.hourly}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>Night extra:</Text>
        <Text style={styles.infoText}>{selectedSalaryProfile.nightExtra}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>Week extra:</Text>
        <Text style={styles.infoText}>
          {selectedSalaryProfile.weekendExtra}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>Holiday extra:</Text>
        <Text style={styles.infoText}>
          {selectedSalaryProfile.holidayExtra}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>Monthly hours:</Text>
        <Text style={styles.infoText}>
          {selectedSalaryProfile.monthlyHours}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.labelText}>Food money:</Text>
        <Text style={styles.infoText}>{selectedSalaryProfile.foodMoney}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    // alignItems: "center"
  },
  headerRightBtnContainer: {
    flexDirection: "row",
  },
  headerRightBtn: {
    marginRight: 10,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  labelText: {
    fontSize: 20,
    color: Colors.primaryText,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 20,
    color: Colors.primaryText,
  },
});

export default SalaryProfileDetailScreen;
