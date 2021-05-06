// import { SHIFTS } from "../../data/dummy-shifts";
import { CREATE_SHIFT, SET_SHIFTS, DELETE_SHIFT, UPDATE_SHIFT, FIND_SHIFT, TOGGLE_FAVORITE } from "../actions/shifts";
import Shift from "../../models/shift";

const initialState = {
  shifts: [],
  favoriteshift: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHIFT:
      console.log("Shift ID: " + action.shiftData.id.toString());
      const newShift = new Shift(
        action.shiftData.id.toString(),
        action.shiftData.type,
        action.shiftData.title,
        action.shiftData.shiftId,
        action.shiftData.address,
        action.shiftData.date,
        action.shiftData.startTime,
        action.shiftData.endTime,
        action.shiftData.overtimePercentage,
        action.shiftData.paidLunch,
        action.shiftData.note
      );
      return {
        ...state,
        shifts: state.shifts.concat(newShift),
      };
    case SET_SHIFTS:
      return {
        shifts: action.shifts.map(
          (s) =>
            new Shift(
              s.id.toString(),
              s.type,
              s.title,
              s.shiftId,
              s.address,
              s.date,
              s.startTime,
              s.endTime,
              s.overtimePercentage,
              s.paidLunch,
              s.note
            )
        ),
      };
    case DELETE_SHIFT:
      console.log("Delete Shift Reducer");
      return {
        ...state,
        shifts: state.shifts.filter(shift => shift.id !== action.shiftData.id),
      };
    case UPDATE_SHIFT:
      const updatedShift = new Shift(
        action.sId,
        action.shiftData.type,
        action.shiftData.title,
        action.shiftData.shiftId,
        action.shiftData.address,
        action.shiftData.date,
        action.shiftData.startTime,
        action.shiftData.endTime,
        action.shiftData.overtimePercentage,
        action.shiftData.paidLunch,
        action.shiftData.note
      );

      const shiftIndex = state.shifts.findIndex(
        (shift) => shift.id === action.sId
      );
      const updatedShifts = [...state.shifts];
      updatedShifts[shiftIndex] = updatedShift;
      return {
        ...state,
        shifts: updatedShifts,
      };
    case FIND_SHIFT:
      const shiftsFound = [];
      state.shifts.forEach(shift => {
        if(action.shiftData.date === shift.date) {
          shiftsFound.push(shift);
        }
      });

      if(shiftsFound > 0) {

      } else {
        return false;
      }
    case TOGGLE_FAVORITE:
      
    default:
      return state;
  }
};
