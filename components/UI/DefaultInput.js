import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Separator from "../Separator";

const defaultInput = (props) => {
  const [showTitle, setShowTitle] = useState(props.visible);
  // const [input, setInput] = useState("")

  const inputs = [];

  for (let i = 0; i < props.value.length; i++) {
    inputs.push(
      <View style={styles.inputRow}>
        <View style={styles.rowSection}>
          {props.icon[i] && (
            <View style={{ marginLeft: 10 }}>
              <Ionicons
                name={props.icon[i]}
                size={30}
                color={Colors.secondary}
              />
            </View>
          )}
          {props.textInputLabel && props.textInputLabel[i] !== null && (
            <Text style={styles.pickerLabelText}>
              {props.textInputLabel[i]}
            </Text>
          )}
          <View style={styles.rowSection2}>
            <TextInput
              style={styles.textInput}
              placeholder={props.placeholder[i]}
              underlineColorAndroid="transparent"
              placeholderTextColor="#8c8c8c"
              onChangeText={(text) => props.setValue[i](text)}
              maxLength={props.maxLength[i]}
            />
          </View>
        </View>
      </View>
    );
    if (props.value.length - 1 > i) {
      inputs.push(<Separator />);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.rowSection}>
          <Text
            style={[
              styles.titleText,
              // props.value !== "" ? { color: Colors.secondary } : null,
            ]}
          >
            {props.containerTitle}
          </Text>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => props.showModal(props.containerTitle)}
          >
            <Ionicons name="help" size={30} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => setShowTitle(!showTitle)}
        >
          <Ionicons
            name={showTitle ? "ios-arrow-up" : "ios-arrow-down"}
            size={30}
            color={/*props.value ? Colors.secondary : */ Colors.primaryText}
          />
        </TouchableOpacity>
      </View>
      {showTitle && <View style={styles.inputContainer}>{inputs}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleText: {
    color: "#fff",
    fontSize: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    paddingVertical: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowSection: {
    flex: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  rowSection2: {
    flex: 1,
  },
  textInput: {
    // backgroundColor: "blue",
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    marginVertical: 5,
  },
  pickerLabelText: {
    fontSize: 18,
    marginLeft: 10,
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

export default defaultInput;
