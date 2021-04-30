import { REDDAYS } from "../data/redDays";

const hourCalculation = (startDate, startTime, endTime, type) => {
  const startT = startTime.split(":");
  const endT = endTime.split(":");
  switch (type) {
    case "hours":
      return hourCalc(startT, endT);
    case "night":
      return nightCalc(startT, endT);
    case "weekendSat":
      return weekendSatCalc(startT, endT);
    case "weekendSun":
      return weekendSunCalc(startT, endT);
    case "weekendMon":
      return weekendMonCalc(startT, endT);
    case "overtime":
      return overtimeCalc(startT,endT);
    case "redDay":
      return redDayCalc(startDate, startT, endT);
    default:
      return null;
  }
};

const hourCalc = (startTime, endTime) => {
  let value = null;
  // const stH = parseInt(startTime[0]);
  // const stM = parseInt(startTime[1]);
  // const etH = parseInt(endTime[0]);
  // const etM = parseInt(endTime[1]);
  if (startTime[0] < endTime[0]) {
    if (startTime[1] == "00" && endTime[1] == "00") {
      value = parseInt(endTime[0]) - parseInt(startTime[0]);
    } else if (startTime[1] !== "00" && endTime[1] !== "00") {
      value = parseInt(endTime[0]) - (parseInt(startTime[0]) + 1);
      value += (60 - parseInt(startTime[1])) / 60 + parseInt(endTime[1]) / 60;
    } else if (startTime[1] !== "00") {
      value = parseInt(endTime[0]) - (parseInt(startTime[0]) + 1);
      value += 1 - parseInt(startTime[1]) / 60;
    } else if (endTime[1] !== "00") {
      value = parseInt(endTime[0]) - parseInt(startTime[0]);
      value += parseInt(endTime[1]) / 60;
    }
  } else if (startTime[0] > endTime[0]) {
    if (startTime[1] == "00" && endTime[1] == "00") {
      value = 24 - parseInt(startTime[0]) + parseInt(endTime[0]);
    } else if (startTime[1] !== "00" && endTime[1] !== "00") {
      value = 23 - parseInt(startTime[0]) + parseInt(endTime[0]);
      value += (60 - parseInt(startTime[1])) / 60 + parseInt(endTime[1]) / 60;
    } else if (startTime[1] !== "00") {
      value = 23 - parseInt(startTime[0]) + parseInt(endTime[0]);
      value += parseInt(startTime[1]) / 60;
    } else if (endTime[1] !== "00") {
      value = 24 - parseInt(startTime[0]) + parseInt(endTime[0]);
      value += parseInt(endTime[1]) / 60;
    }
  } else {
    value = endTime[1] / 60;
  }
  // console.log("HourCalc: " + value);
  return parseFloat(value).toFixed(2);
};

const nightCalc = (startTime, endTime) => {
  let value = 0;
  const stH = parseInt(startTime[0]);
  const stM = parseInt(startTime[1]);
  const etH = parseInt(endTime[0]);
  const etM = parseInt(endTime[1]);

  if (stH < 6 || stH > etH || etH >= 21) {
    if (stH < 6 && etH < 6) {
      // Shift start from 00:00 and ends before 06:00 --- DONE
      if (stM < etM) {
        value += etH - stH;
        value += (etM - stM) / 60;
      } else if (stM > etM) {
        value += etH - stH - 1;
        value += (stM - etM) / 60;
      } else {
        value += etH - stH;
      }
    } else if (stH < 6 && etH >= 6 && etH < 21) {
      // Shift start before 06:00 and end between 06:00 and 21:00 --- DONE
      if (stM !== 0) {
        value += 1 - stM / 60;
        if (stH < 5) {
          value += 6 - (stH + 1);
        }
      } else {
        value += 6 - stH;
      }
    } else if (stH >= 6 && stH < 21 && etH >= 21 && etH < 24) {
      // Shift start between 06:00 and 21:00 and end before 00:00 --- DONE
      if (etM !== 0) {
        value += etH - 21;
        value += etM / 60;
      } else {
        value += etH - 21;
      }
    } else if (stH > etH) {
      // Shift that start before midnight and end after midnight --- DONE
      if (etH >= 6) {
        value += 6;
      } else {
        value += etH + etM / 60;
      }
      if (stH < 21 || (stH === 21 && stM === 0)) {
        value += 3;
      } else {
        value += 23 - stH + (1 - stM / 60);
      }
    }
  }
  return value;
};

const weekendSatCalc = (startTime, endTime) => {
  let value = 0;
  const stH = parseInt(startTime[0]);
  const stM = parseInt(startTime[1]);
  const etH = parseInt(endTime[0]);
  const etM = parseInt(endTime[1]);

  if (stH < 18 && etH >= 18 && etH < 24) {
    // Shift start before 18:00 and end between 18:00 and 00:00 --- DONE
    if (etM !== 0) {
      value += etH - 18;
      value += etM / 60;
    } else {
      value += etH - 18;
    }
  } else if (stH > etH) {
    // Shift that start before midnight and end after midnight --- DONE
    value += etH + etM / 60;

    if (stH < 18 || (stH === 18 && stM === 0)) {
      value += 6;
    } else {
      value += 23 - stH + (1 - stM / 60);
    }
  }

  return value;
};

const weekendSunCalc = (startTime, endTime) => {
  let value = 0;
  const stH = parseInt(startTime[0]);
  const stM = parseInt(startTime[1]);
  const etH = parseInt(endTime[0]);
  const etM = parseInt(endTime[1]);

  if (stH < etH && etH < 24) {
    // Shift start from 00:00 and ends before 24:00 --- DONE
    if (stM < etM) {
      value += etH - stH;
      value += (etM - stM) / 60;
    } else if (stM > etM) {
      value += etH - stH - 1;
      value += (stM - etM) / 60;
    } else {
      value += etH - stH;
    }
  } else if (stH > etH) {
    // Shift that start before midnight and end after midnight --- DONE
    if (etH >= 6) {
      value += 6;
    } else {
      value += etH + etM / 60;
    }
    value += 23 - stH + (1 - stM / 60);
  }

  return value;
};

const weekendMonCalc = (startTime, endTime) => {
  let value = 0;
  const stH = parseInt(startTime[0]);
  const stM = parseInt(startTime[1]);
  const etH = parseInt(endTime[0]);
  const etM = parseInt(endTime[1]);

  if (stH < 6 && etH < 6) {
    // Shift start from 00:00 and ends before 06:00 --- DONE
    if (stM < etM) {
      value += etH - stH;
      value += (etM - stM) / 60;
    } else if (stM > etM) {
      value += etH - stH - 1;
      value += (stM - etM) / 60;
    } else {
      value += etH - stH;
    }
  } else if (stH < 6 && etH >= 6) {
    // Shift start before 06:00 and end after 06:00 --- DONE
    if (stM !== 0) {
      value += 1 - stM / 60;
      if (stH < 5) {
        value += 6 - (stH + 1);
      }
    } else {
      value += 6 - stH;
    }
  }

  return value;
};

const overtimeCalc = (startTime, endTime) => {
  let value = 0;
  const stH = parseInt(startTime[0]);
  const stM = parseInt(startTime[1]);
  const etH = parseInt(endTime[0]);
  const etM = parseInt(endTime[1]);

  return value;
}

const redDayCalc = (startDate, startTime, endTime) => {
  let value = 0;
  const stH = parseInt(startTime[0]);
  const stM = parseInt(startTime[1]);
  const etH = parseInt(endTime[0]);
  const etM = parseInt(endTime[1]);
  // console.log(endDate)
  // console.log("redDayCalc: " + value);
  REDDAYS.forEach((element) => {
    if (startDate > element.startDate && startDate < element.endDate) {
      // console.log(startDate);
      if (stH < etH && etH < 24) {
        // Shift start from 00:00 and ends before 24:00 --- DONE
        if (stM < etM) {
          value += etH - stH;
          value += (etM - stM) / 60;
        } else if (stM > etM) {
          value += etH - stH - 1;
          value += (stM - etM) / 60;
        } else {
          value += etH - stH;
        }
      } else if (stH > etH) {
        // Shift that start before midnight and end after midnight --- DONE
        if (etH >= 6) {
          value += 6;
        } else {
          value += etH + etM / 60;
        }
        value += 23 - stH + (1 - stM / 60);
      }
    } else if (startDate === element.startDate) {
      const redDayStartTime = element.startTime.split(":");
      const rdstH = parseInt(redDayStartTime[0]);
      if (stH < rdstH && etH >= rdstH && etH < 24) {
        // Shift start before XX:00 and end between XX:00 and 00:00 --- DONE
        if (etM !== 0) {
          value += etH - rdstH;
          value += etM / 60;
        } else {
          value += etH - rdstH;
        }
      } else if (stH > etH) {
        // Shift that start before midnight and end after midnight --- DONE
        value += etH + etM / 60;

        if (stH < rdstH || (stH === rdstH && stM === 0)) {
          value += 6;
        } else {
          value += 23 - stH + (1 - stM / 60);
        }
      }
    }
  });
  // console.log("redDayCalc: " + value);
  return value;
};

export default hourCalculation;
