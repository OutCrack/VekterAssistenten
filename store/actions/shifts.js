export const CREATE_SHIFT = "CREATE_SHIFT";
export const SET_SHIFTS = "SET_SHIFTS";
export const DELETE_SHIFT = "DELETE_SHIFT";
export const UPDATE_SHIFT = "UPDATE_SHIFT";
export const FIND_SHIFTS = "FIND_SHIFTS";

import {
  fetchShifts,
  insertShift,
  removeShift,
  editShift,
} from "../../helper/shiftDataBase";

export const loadShifts = (props) => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchShifts(props);
      console.log(dbResult);
      dispatch({ type: SET_SHIFTS, shifts: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const createShift = (
  type,
  title,
  shiftId,
  address,
  date,
  startTime,
  endTime,
  overtimePercentage,
  paidLunch,
  note
) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertShift(
        type,
        title,
        shiftId,
        address,
        date,
        startTime,
        endTime,
        overtimePercentage,
        paidLunch,
        note
      );
      console.log("------------------ Create Shift ------------------");
      console.log(dbResult);
      dispatch({
        type: CREATE_SHIFT,
        shiftData: {
          id: dbResult.insertId,
          type,
          title,
          shiftId,
          address,
          date,
          startTime,
          endTime,
          overtimePercentage,
          paidLunch,
          note,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const findShift = (date, startTime, endTime) => {
  return {
    type: FIND_SHIFTS,
    shiftData: {
      date,
      startTime,
      endTime,
    },
  };
};

export const deleteShift = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await removeShift(id);
      console.log("------------------ Delete Shift ------------------");
      console.log(dbResult);
      dispatch({ type: DELETE_SHIFT, shiftData: { id: id } });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const updateShift = (
  id,
  type,
  title,
  shiftId,
  address,
  date,
  startTime,
  endTime,
  overtimePercentage,
  paidLunch,
  note
) => {
  return async (dispatch) => {
    try {
      const dbResult = await editShift(
        id,
        type,
        title,
        shiftId,
        address,
        date,
        startTime,
        endTime,
        overtimePercentage,
        paidLunch,
        note
      );

      console.log("------------------ Edit Shift ------------------");
      console.log(dbResult);
      dispatch({
        type: UPDATE_SHIFT,
        sId: id,
        shiftData: {
          type,
          title,
          shiftId,
          address,
          date,
          startTime,
          endTime,
          overtimePercentage,
          paidLunch,
          note,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
