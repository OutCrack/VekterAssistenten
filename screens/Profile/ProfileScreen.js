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

const ProfileScreen = (props) => {
  const onItemPressed = (key) => {
    props.navigation.navigate(key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.iconContainer}>
          <Icon size={100} name={"person-circle-outline"} color={Colors.primaryText} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.rowText}>Profile information</Text>
        </View>
        <View style={styles.arrowIcon}>
          <Icon size={30} name={"md-arrow-forward"} color={Colors.secondary} />
        </View>
      </View>

      <TouchableOpacity onPress={() => onItemPressed("SalaryProfile")}>
        <View style={styles.rowContainer}>
          <View style={styles.btnIconContainer}>
            <Icon size={30} name={"archive"} color={Colors.primaryText} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.rowText}>Dine Lønnsprofiler</Text>
          </View>
          <View style={styles.arrowIcon}>
            <Icon
              size={30}
              name={"md-arrow-forward"}
              color={Colors.secondary}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('onItemPressed("settings")')}>
        <View style={styles.rowContainer}>
          <View style={styles.btnIconContainer}>
            <Icon size={30} name={"settings"} color={Colors.primaryText} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.rowText}>Innstillinger</Text>
          </View>
          <View style={styles.arrowIcon}>
            <Icon
              size={30}
              name={"md-arrow-forward"}
              color={Colors.secondary}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('onItemPressed("help")')}>
        <View style={styles.rowContainer}>
          <View style={styles.btnIconContainer}>
            <Icon size={30} name={"md-help"} color={Colors.primaryText} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.rowText}>Hjelp & FAQ</Text>
          </View>
          <View style={styles.arrowIcon}>
            <Icon
              size={30}
              name={"md-arrow-forward"}
              color={Colors.secondary}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('onItemPressed("logOut")')}>
        <View style={styles.rowContainer}>
          <View style={styles.btnIconContainer}>
            <Icon size={30} name={"md-log-out"} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.rowTextLogOut}>Log out</Text>
          </View>
          <View style={styles.arrowIcon}>
            <Icon size={30} name={"md-arrow-forward"} color="black" />
          </View>
        </View>
      </TouchableOpacity>
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
    marginBottom: 100
  },
  profileInfo: {
    // borderColor: "black",
    // borderWidth: 1,
    alignItems: "center",
    width: "80%"
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
    color: "black",
  },
  arrowIcon: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default ProfileScreen;
