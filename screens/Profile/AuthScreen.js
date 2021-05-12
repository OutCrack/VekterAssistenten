import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from 'react-redux';

import AuthInput from "../../components/UI/AuthInput";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupHandler = () => {
    dispatch(authActions.signup(email, password));
  };

  const forgotPasswordHandler = () => {
    alert("Forgot password is pressed");
  };

  const switchAuthModeHandler = () => {
    authMode === "login" ? setAuthMode("signup") : setAuthMode("login");
  };

  let confirmPasswordControl = null;
  let forgotPassButton = null;
  let authButton = null;
  if (authMode === "signup") {
    confirmPasswordControl = (
      <AuthInput
        placeholder="Bekreft passord"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(val) => setConfirmPassword(val)}
        // valid={this.state.controls.confirmPassword.valid}
        // touched={this.state.controls.confirmPassword.touched}
      />
    );
    authButton = (
      <TouchableOpacity style={styles.btnLogin} onPress={() => signupHandler()}>
        <Text style={styles.btnText}>Registrer</Text>
      </TouchableOpacity>
    );
  } else if (authMode === "login") {
    forgotPassButton = (
      <TouchableOpacity
        style={styles.btnForgotPass}
        onPress={() => forgotPasswordHandler()}
      >
        <Text style={styles.forgotPassText}>Glemt passord?</Text>
      </TouchableOpacity>
    );
    authButton = (
      <TouchableOpacity
        style={styles.btnLogin}
        onPress={() => props.navigation.navigate("AllShift")}
      >
        <Text style={styles.btnText}>Logg inn</Text>
      </TouchableOpacity>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.header}>Vekter {"\n"} Assistenten</Text>
      </View>
      <View style={styles.inputContainer}>
        <AuthInput
          placeholder="E-post"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={(val) => setEmail(val)}
          // valid={this.state.controls.email.valid}
          // touched={this.state.controls.email.touched}
        />
        <AuthInput
          placeholder="Passord"
          secureTextEntry
          value={password}
          onChangeText={(val) => setPassword(val)}
          // valid={this.state.controls.password.valid}
          // touched={this.state.controls.password.touched}
        />
        {confirmPasswordControl}
        {authButton}
        {forgotPassButton}
      </View>

      <TouchableOpacity
        style={styles.signupContainer}
        onPress={() => switchAuthModeHandler()}
      >
        <Text style={styles.forgotPassText}>
          {authMode === "login"
            ? "Har du ikke bruker?"
            : "Har du allerede konto?"}
        </Text>
        <Text style={styles.forgotPassTextPluss}>
          {authMode === "login" ? "Registrer deg" : "Logg inn"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.primaryDark,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  header: {
    color: Colors.secondary,
    fontSize: 50,
    fontWeight: "700",
    textAlign: "center",
  },
  inputContainer: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnLogin: {
    backgroundColor: Colors.secondary,
    width: "80%",
    padding: 10,
    margin: 15,
    borderRadius: 25,
  },
  btnText: {
    textAlign: "center",
    color: Colors.secondaryText,
    fontSize: 18,
  },
  btnForgotPass: {
    marginTop: 5
  },
  forgotPassText: {
    color: Colors.primaryText,
  },
  forgotPassTextPluss: {
    color: Colors.secondary,
    fontWeight: "700",
    marginLeft: 5
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
});
export default AuthScreen;
