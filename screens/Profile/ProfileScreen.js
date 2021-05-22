import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";

import ProfileButton from "../../components/UI/ProfileButton";

const ProfileScreen = (props) => {
  const onItemPressed = (key) => {
    props.navigation.navigate(key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.iconContainer}>
          <Icon
            size={100}
            name={"person-circle-outline"}
            color={Colors.primaryText}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.rowText}>Profile information</Text>
        </View>
        <View style={styles.arrowIcon}>
          <Icon size={30} name={"md-arrow-forward"} color={Colors.secondary} />
        </View>
      </View>

      <ProfileButton
        onItemPressed={() => onItemPressed("SalaryProfile")}
        icon="archive"
        rowText="Mine Lønnsprofiler"
      />
      <ProfileButton
        onItemPressed={() => onItemPressed("FavoriteShifts")}
        icon="star"
        rowText="Markerte Vakter"
      />
      <ProfileButton
        onItemPressed={() => console.log('onItemPressed("innboks")')}
        icon="mail"
        rowText="Innboks"
      />
      <ProfileButton
        onItemPressed={() => props.navigation.navigate("Settings")}
        icon="settings"
        rowText="Innstillinger"
      />
      <ProfileButton
        onItemPressed={() => console.log('onItemPressed("help")')}
        icon="md-help"
        rowText="Hjelp & FAQ"
      />
      <ProfileButton
        onItemPressed={() => props.navigation.navigate("Auth")}
        icon="md-log-out"
        rowText="Logg inn"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
  },
  profileInfoContainer: {
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 100,
  },
  profileInfo: {
    // borderColor: "black",
    // borderWidth: 1,
    alignItems: "center",
    width: "80%",
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: "100%",
  },
  btnIconContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "70%",
  },
  rowText: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.primaryText,
  },
  rowTextLogOut: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.primaryText,
  },
  arrowIcon: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default ProfileScreen;
