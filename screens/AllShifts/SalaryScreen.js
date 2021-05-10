import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import HourCalc from "../../utility/hourCalculation";
import SalaryCalc from "../../utility/earningsCalculation";
import Colors from "../../constants/Colors";

const SalaryScreen = (props) => {
  const { selectedMonth, year } = props.route.params;
  const allShifts = useSelector((state) => state.shifts.shifts);
  const allSalaryProfiles = useSelector(
    (state) => state.salaryProfiles.salaryProfiles
  );
  let shifts = [];
  let overtime = [];

  // THIS MUST BE BETTER
  let salaryProfile;
  allSalaryProfiles.forEach((sp) => {
    const startDate = sp.startDate.split("-");
    const endDate = sp.endDate.split("-");
    if (year >= parseInt(startDate[0]) && year <= parseInt(endDate[0])) {
      salaryProfile = sp;
    }
  });

  allShifts.forEach((element) => {
    let month = element.date.split("-");
    if (parseInt(month[1]) === selectedMonth) {
      if (element.type === "normal") {
        shifts.push(element);
      } else if (element.type === "overtime") {
        overtime.push(element);
      }
    }
  });


  let overtime50Comp = null,
    overtimeMonthlyComp = null,
    overtime100Comp = null,
    foodMoneyComp = null,
    overtimeBreakComp = null,
    redDaysComp = null;

  let TOTAL = 0.0;
  let hoursShift = 0.0,
    night = 0.0,
    weekend = 0.0,
    redDay = 0.0;

  let hoursCash, nightCash, weekendCash, redDayCash;

  let hoursOvertime = 0.0,
    hoursOvertime50 = 0.0,
    hoursOvertime100 = 0.0,
    foodMoneyCount = 0,
    foodMoneyCash = 0.0,
    overtimeBreakCash = 0.0;

  let overtimeMonthlyCash = 0.0,
    overtime50Cash = 0.0,
    overtime100Cash = 0.0;


  // Calulation shifts and overtime
  shifts.forEach((value) => {
    hoursShift += parseFloat(
      HourCalc("", value.startTime, value.endTime, "hours")
    );
    night += parseFloat(HourCalc("", value.startTime, value.endTime, "night"));
    redDay += parseFloat(
      HourCalc(value.date, value.startTime, value.endTime, "redDay")
    );
    // Checks if it is weekend
    let shiftDate = value.date.split("-");
    const date = new Date(shiftDate[0], shiftDate[1] - 1, shiftDate[2]);
    if (date.getDay() === 6) {
      weekend += parseFloat(
        HourCalc("", value.startTime, value.endTime, "weekendSat")
      );
    } else if (date.getDay() === 0) {
      weekend += parseFloat(
        HourCalc("", value.startTime, value.endTime, "weekendSun")
      );
    } else if (date.getDay() === 1) {
      weekend += parseFloat(
        HourCalc("", value.startTime, value.endTime, "weekendMon")
      );
    }
  });

  overtime.forEach((value) => {
    hoursShift += parseFloat(
      HourCalc("", value.startTime, value.endTime, "hours")
    );
    hoursOvertime += parseFloat(
      HourCalc("", value.startTime, value.endTime, "hours")
    );
    redDay += parseFloat(
      HourCalc(value.date, value.startTime, value.endTime, "redDay")
    );
    if (value.overtimePercentage === "50") {
      hoursOvertime50 += parseFloat(
        HourCalc("", value.startTime, value.endTime, "hours")
      );
    } else if (value.overtimePercentage === "100") {
      hoursOvertime100 += parseFloat(
        HourCalc("", value.startTime, value.endTime, "hours")
      );
    }
    if (value.foodMoney) {
      foodMoneyCount++;
      foodMoneyCash += salaryProfile.foodMoney;
      overtimeBreakCash += salaryProfile.hourly / 2;
    }
  });

  hoursCash = SalaryCalc("hours", hoursShift, salaryProfile.hourly);
  nightCash = SalaryCalc("night", night, salaryProfile.nightExtra);
  weekendCash = SalaryCalc(
    "weekend",
    weekend,
    salaryProfile.weekendExtra
  );
  overtimeMonthlyCash = SalaryCalc(
    "hours",
    hoursShift - salaryProfile.monthlyHours,
    salaryProfile.hourly / 2
  );
  redDayCash = SalaryCalc("hours", redDay, salaryProfile.hourly);

  TOTAL += hoursCash + nightCash + weekendCash + redDayCash;

  if (overtime.length > 0) {
    if (hoursOvertime50 > 0) {
      overtime50Cash = SalaryCalc(
        "hours",
        hoursOvertime50,
        salaryProfile.hourly / 2
      );
    }
    if (hoursOvertime100 > 0) {
      overtime100Cash = SalaryCalc(
        "hours",
        hoursOvertime100,
        salaryProfile.hourly
      );
    }
    TOTAL +=
      overtimeMonthlyCash +
      overtime50Cash +
      overtime100Cash +
      foodMoneyCash +
      overtimeBreakCash;
  }

  if (hoursShift > salaryProfile.monthlyHours) {
    overtimeMonthlyComp = (
      <View style={styles.rowContainer}>
        <Text style={styles.rowTitleText}>
          {salaryProfile.monthlyHours}h:{" "}
          {(hoursShift - salaryProfile.monthlyHours).toFixed(2)}
        </Text>
        <Text style={styles.rowCashText}>
          {overtimeMonthlyCash
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
    );
  }

  if (overtime.length > 0) {
    if (hoursOvertime50 > 0) {
      overtime50Comp = (
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitleText}>
            Overtime 50%: {hoursOvertime50.toFixed(2)}
          </Text>
          <Text style={styles.rowCashText}>
            {overtime50Cash
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </View>
      );
    }

    if (hoursOvertime100 > 0) {
      overtime100Comp = (
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitleText}>
            Overtime 100%: {hoursOvertime100.toFixed(2)}
          </Text>
          <Text style={styles.rowCashText}>
            {overtime100Cash
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
        </View>
      );
    }

    if (foodMoneyCount > 0) {
      foodMoneyComp = (
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitleText}>Foodmoney: {foodMoneyCount}</Text>
          <Text style={styles.rowCashText}>{foodMoneyCash.toFixed(2)}</Text>
        </View>
      );
      overtimeBreakComp = (
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitleText}>
            Overtime Break: {foodMoneyCount}
          </Text>
          <Text style={styles.rowCashText}>{overtimeBreakCash.toFixed(2)}</Text>
        </View>
      );
    }
  }

  redDaysComp = (
    <View style={styles.rowContainer}>
      <Text style={styles.rowTitleText}>Helligdager: {redDay.toFixed(2)}</Text>
      <Text style={styles.rowCashText}>{redDayCash.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextSmall}>
          {getMonth(selectedMonth)} {year}
        </Text>
        <Text style={styles.headerTextBig}>
          Kr{" "}
          {TOTAL.toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
      <View style={styles.salaryContainer}>
        <ScrollView alwaysBounceVertical={false}>
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitleText}>
              Timer: {hoursShift.toFixed(2)}
            </Text>
            <Text style={styles.rowCashText}>
              {hoursCash
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              Kr
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitleText}>Natt: {night.toFixed(2)}</Text>
            <Text style={styles.rowCashText}>
              {nightCash
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              Kr
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitleText}>Helg: {weekend.toFixed(2)}</Text>
            <Text style={styles.rowCashText}>
              {weekendCash
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              Kr
            </Text>
          </View>
          {overtimeMonthlyComp}
          {overtime50Comp}
          {overtime100Comp}
          {foodMoneyComp}
          {overtimeBreakComp}
          {redDaysComp}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  headerContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  headerTextSmall: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  headerTextBig: {
    fontSize: 50,
    color: Colors.secondary,
    fontWeight: "bold",
  },
  salaryContainer: {
    backgroundColor: Colors.primaryLight,
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  salaryHeaderTxt: {
    fontWeight: "bold",
    fontSize: 35,
    color: Colors.primaryText,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  rowTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
    color: Colors.primaryText,
  },
  rowCashText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
});

const getMonth = (month) => {
  switch (month) {
    case 1:
      return "Januar";
    case 2:
      return "Februar";
    case 3:
      return "Mars";
    case 4:
      return "April";
    case 5:
      return "Mai";
    case 6:
      return "Juni";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "Oktober";
    case 11:
      return "November";
    case 12:
      return "Desember";
  }
};

export default SalaryScreen;
