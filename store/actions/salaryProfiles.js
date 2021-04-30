export const CREATE_SALARYPROFILE = "CREATE_SALARYPROFILE";
export const DELETE_SALARYPROFILE = "DELETE_SALARYPROFILE";
export const UPDATE_SALARYPROFILE = "UPDATE_SALARYPROFILE";
export const SET_SALARYPROFILES = "SET_SALARYPROFILES";

import {
  insertSalaryProfile,
  updateSalaryProfile,
  removeSalaryProfile,
  fetchSalaryProfiles,
} from "../../helper/salaryProfileDatabase";

export const loadSalaryProfiles = (props) => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchSalaryProfiles(props);
      console.log("Loading SalaryProfiles");
      console.log(dbResult);
      dispatch({
        type: SET_SALARYPROFILES,
        salaryProfiles: dbResult.rows._array,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createSalaryProfile = (
  title,
  startDate,
  endDate,
  hourly,
  nightExtra,
  weekendExtra,
  holidayExtra,
  monthlyHours,
  foodMoney,
  functionSupplement,
  serviceExtension,
  certificate
) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertSalaryProfile(
        title,
        startDate,
        endDate,
        hourly,
        nightExtra,
        weekendExtra,
        holidayExtra,
        monthlyHours,
        foodMoney,
        functionSupplement,
        serviceExtension,
        certificate
      );
      console.log("------------------ Create SalaryProfile ------------------");
      console.log(dbResult);
      dispatch({
        type: CREATE_SALARYPROFILE,
        salaryProfileData: {
          id: dbResult.insertId,
          title,
          startDate,
          endDate,
          hourly,
          nightExtra,
          weekendExtra,
          holidayExtra,
          monthlyHours,
          foodMoney,
          functionSupplement,
          serviceExtension,
          certificate,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const deleteSalaryProfile = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await removeSalaryProfile(id);
      console.log("------------------ Delete SalaryProfile ------------------");
      console.log(dbResult);
      dispatch({
        type: DELETE_SALARYPROFILE,
        salaryProfileData: {
          id: dbResult.insertId,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const editSalaryProfile = (
  id,
  title,
  startDate,
  endDate,
  hourly,
  nightExtra,
  weekendExtra,
  holidayExtra,
  monthlyHours,
  foodMoney,
  functionSupplement,
  serviceExtension,
  certificate
) => {
  return async (dispatch) => {
    try {
      const dbResult = await updateSalaryProfile(
        id,
        title,
        startDate,
        endDate,
        hourly,
        nightExtra,
        weekendExtra,
        holidayExtra,
        monthlyHours,
        foodMoney,
        functionSupplement,
        serviceExtension,
        certificate
      );
      console.log(dbResult);
      dispatch({
        type: UPDATE_SALARYPROFILE,
        spId: dbResult.insertId,
        salaryProfileData: {
          title,
          startDate,
          endDate,
          hourly,
          nightExtra,
          weekendExtra,
          holidayExtra,
          monthlyHours,
          foodMoney,
          functionSupplement,
          serviceExtension,
          certificate,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
