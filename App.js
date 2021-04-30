import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Navigator from "./navigation/AppNavigation";

import shiftsReducer from "./store/reducers/shifts";
import salaryProfilesReducer from "./store/reducers/salaryProfiles";

import { initShiftDB } from "./helper/shiftDataBase";
import { initSalaryProfileDB } from "./helper/salaryProfileDatabase";

initShiftDB()
  .then(() => console.log("Initialized Shifts database"))
  .catch((err) => {
    console.log("Initialized database failed");
    console.log(err);
  });

initSalaryProfileDB()
  .then(() => console.log("Initialized SalaryProfile database"))
  .catch((err) => {
    console.log("Initialized database failed");
    consol.log(err);
  });

const rootReducer = combineReducers({
  shifts: shiftsReducer,
  // overtime: overtimeReducer,
  salaryProfiles: salaryProfilesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};