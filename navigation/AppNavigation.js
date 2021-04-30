import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";

import AllShiftsScreen from "../screens/AllShifts/AllShiftsScreen";
import SalaryProfileScreen from "../screens/Profile/SalaryProfileScreen";
import ShiftDetailScreen from "../screens/AllShifts/ShiftDetailScreen";
import AddShiftScreen from "../screens/AllShifts/AddShiftScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SalaryProfileDetailScreen from "../screens/Profile/SalaryProfileDetailScreen";
import SelectDateScreen from "../screens/AllShifts/SelectDateScreen";
import AddSalaryProfileScreen from "../screens/Profile/AddSalaryProfileScreen";
import SalaryScreen from "../screens/AllShifts/SalaryScreen";

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="AllShiftStack" component={AllShiftsScreen} />
      <Drawer.Screen name="SalaryProfile" component={SalaryProfileScreen} />
    </Drawer.Navigator>
  );
};

const MainStack = createStackNavigator();

const MainStackScreens = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="ShiftCalendar"
        component={AllShiftsScreen}
        options={{
          title: "Mine Vakter",
          headerStyle: { backgroundColor: Colors.primaryDark },
          headerTintColor: "#fff",
        }}
      />
      <MainStack.Screen
        name="AddShift"
        component={AddShiftScreen}
        options={{
          title: "Ny Vakt",
          headerStyle: { backgroundColor: Colors.primaryDark },
          headerTintColor: "#fff",
        }}
      />
      <MainStack.Screen
        name="SelectDate"
        component={SelectDateScreen}
        options={{
          title: "Valg Dato",
          headerStyle: { backgroundColor: Colors.primaryDark },
          headerTintColor: "#fff",
        }}
      />
      <MainStack.Screen
        name="ShiftDetail"
        component={ShiftDetailScreen}
        options={{
          title: "Vakt detaljer",
          headerStyle: { backgroundColor: Colors.primaryDark },
          headerTintColor: "#fff",
        }}
      />
      <MainStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Min Profil",
          headerStyle: { backgroundColor: Colors.primaryDark },
          headerTintColor: "#fff",
        }}
      />
      <MainStack.Screen
        name="SalaryProfile"
        component={SalaryProfileScreen}
        options={{
          title: "Mine Lønsprofiler",
          headerStyle: { backgroundColor: Colors.primaryDark },
          headerTintColor: "#fff",
        }}
      />
      <MainStack.Screen
        name="SalaryProfileDetail"
        component={SalaryProfileDetailScreen}
        options={{
          title: "Mine Lønsprofile",
          headerStyle: { backgroundColor: Colors.primaryDark },
          headerTintColor: "#fff",
        }}
      />
      <MainStack.Screen
        name="AddSalaryProfile"
        component={AddSalaryProfileScreen}
        options={{
          title: "Ny Lønnsprofil",
          headerStyle: { backgroundColor: Colors.primaryDark },
          headerTintColor: "#fff",
        }}
      />
      <MainStack.Screen
        name="Salary"
        component={SalaryScreen}
        options={{
          title: "Lønnskalkulering",
          headerStyle: { backgroundColor: Colors.primaryDark },
          headerTintColor: "#fff",
        }}
      />
    </MainStack.Navigator>
  );
};

const AppNavigation = (props) => {
  return (
    <NavigationContainer>
      <MainStackScreens />
    </NavigationContainer>
  );
};

export default AppNavigation;
