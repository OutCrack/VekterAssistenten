import { SALARYPROFILES } from "../../data/dummy-salaryProfile";
import {
  CREATE_SALARYPROFILE,
  DELETE_SALARYPROFILE,
  UPDATE_SALARYPROFILE,
  SET_SALARYPROFILES,
} from "../actions/salaryProfiles";
import SalaryProfile from "../../models/salaryProfile";

const initialState = {
  salaryProfiles: SALARYPROFILES,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SALARYPROFILES:
      return {
        salaryProfiles: action.salaryProfiles.map(
          (sp) =>
            new SalaryProfile(
              sp.id.toString(),
              sp.title,
              sp.startDate,
              sp.endDate,
              sp.hourly,
              sp.nightExtra,
              sp.weekendExtra,
              sp.holidayExtra,
              sp.monthlyHours,
              sp.foodMoney,
              sp.functionSupplement,
              sp.serviceExtension,
              sp.certificate
            )
        ),
      };
    case CREATE_SALARYPROFILE:
      const newSalaryProfile = new SalaryProfile(
        action.salaryProfileData.id.toString(),
        action.salaryProfileData.title,
        action.salaryProfileData.startDate,
        action.salaryProfileData.endDate,
        action.salaryProfileData.hourly,
        action.salaryProfileData.nightExtra,
        action.salaryProfileData.weekendExtra,
        action.salaryProfileData.holidayExtra,
        action.salaryProfileData.monthlyHours,
        action.salaryProfileData.foodMoney,
        action.salaryProfileData.functionSupplement,
        action.salaryProfileData.serviceExtension,
        action.salaryProfileData.certificate,
      );
      return {
        salaryProfiles: state.salaryProfiles.concat(newSalaryProfile),
      };
    case DELETE_SALARYPROFILE:
      console.log("Delete SalaryProfile Reducer");
      return {
        ...state,
        salaryProfiles: state.salaryProfiles.filter(
          (salaryProfiles) => salaryProfiles.id !== action.id
        )
      };
    case UPDATE_SALARYPROFILE:
      const updatedSalaryProfile = new SalaryProfile(
        action.spId,
        action.salaryProfileData.name,
        action.salaryProfileData.starDate,
        action.salaryProfileData.endDate,
        action.salaryProfileData.hourly,
        action.salaryProfileData.nightExtra,
        action.salaryProfileData.weekendExtra,
        action.salaryProfileData.holidayExtra,
        action.salaryProfileData.monthlyExtra,
        action.salaryProfileData.foodMoney
      );

      const salaryProfileIndex = state.salaryProfiles.findIndex(
        (salaryProfile) => salaryProfile.id === action.spId
      );
      const updatedSalaryProfiles = [...state.salaryProfiles];
      updatedSalaryProfiles[salaryProfileIndex] = updatedSalaryProfile;
      return {
        salaryProfiles: updatedSalaryProfiles,
      };
  }
  return state;
};
