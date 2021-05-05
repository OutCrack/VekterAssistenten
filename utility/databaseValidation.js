export const findShift = (allShifts, date, startTime, endTime) => {
  let isFound = false;
  const startT = startTime.split(":");
  const endT = endTime.split(":");

  allShifts.forEach((shift) => {
    const shiftST = shift.startTime.split(":");
    const shiftET = shift.endTime.split(":");
    if (shift.date === date) {
      if (startT[0] <= shiftST[0] && endT[0] == shiftST[0]) {
        if (endT[1] > shiftST[1]) {
          isFound = true;
          return;
        }
      } else if (startT[0] <= shiftST[0] && endT[0] > shiftST[0]) {
        isFound = true;
        return;
      } else if (startT[0] > shiftST[0] && endT[0] < shiftET[0]) {
        isFound = true;
        return;
      } else if (startT[0] == shiftST[0] && endT[0] > shiftST[0]) {
        isFound = true;
        return;
      } else if (startT[0] == shiftST[0] && endT[0] < shiftST[0]) {
        isFound = true;
        return;
      } else if (startT[0] < shiftET[0] && endT[0] > shiftET[0]) {
        isFound = true;
        return;
      } else if (startT[0] < shiftET[0] && endT[0] > shiftET[0]) {
        isFound = true;
        return;
      } else if (startT[0] == shiftET[0] && endT[0] > shiftET[0]) {
        if (startT[1] < shiftET[1]) {
          isFound = true;
          return;
        }
      }
    }
  });
  return isFound;
};

export const findSalaryProfile = (allSalaryProfiles, startDate, endDate) => {
  let isFound = false;
  const startD = startDate.split("-");
  const endD = endDate.split("-");

  allSalaryProfiles.forEach((salaryProfile) => {
		const salaryProfileStart = salaryProfile.startDate.split(".");
		const salaryProfileEnd = salaryProfile.endDate.split(".");
		// console.log(startD[2], salaryProfileStart[0], endD[2], salaryProfileStart[0])
		if(startD[0] <= salaryProfileStart[2] && endD[0] == salaryProfileStart[2]) {
			if(endD[1] > salaryProfileStart[1]) {
				isFound = true;
				return;
			} else if (endD[1] == salaryProfileStart[1]) {
				if(endD[2] > salaryProfileStart[0]) {
					isFound = true;
					return;
				}
			}
		} else if( startD[0] <= salaryProfileStart[2] && endD[0] > salaryProfileStart[2] ) {
			isFound = true;
			return;
		} else if (startD[0] > salaryProfileStart[2] && endD[0] < salaryProfileEnd[2]) {
			isFound = true;
			return;
		} else if (startD[0] > salaryProfileStart[2] && endD[0] > salaryProfileEnd[2]) {
			isFound = true;
			return;
		} else if(startD[0] == salaryProfileEnd[2] && endD[0] > salaryProfileEnd[2]) {
			if(startD[1] < salaryProfileEnd[1]) {
				isFound = true;
				return;
			} else if (startD[1] == salaryProfileEnd[1]) {
				if (startD[2] < salaryProfileEnd[0]) {
					isFound = true;
					return;
				}
			}
		}
	});
	return isFound;
};
