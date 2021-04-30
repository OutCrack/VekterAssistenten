import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("salaryProfiles.db");

export const initSalaryProfileDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS salaryProfiles (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, startDate TEXT NOT NULL, endDate TEXT NOT NULL, hourly REAL NOT NULL, nightExtra REAL NOT NULL, weekendExtra REAL NOT NULL, holidayExtra REAL NOT NULL, monthlyHours REAL NOT NULL, foodMoney TEXT NOT NULL, functionSupplement TEXT, serviceExtension TEXT, certificate TEXT);",
        [],
        // SUCCESS FUNCTION
        () => {
          resolve();
        },
        // ERROR FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchSalaryProfiles = (props) => {
  const promise = new Promise((resolv, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        props,
        [],
        // SUCCESS FUNCTION
        (_, result) => {
          resolv(result);
        },
        // ERROR FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertSalaryProfile = (
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
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO salaryProfiles (title, startDate, endDate, hourly, nightExtra, weekendExtra, holidayExtra, monthlyHours, foodMoney, functionSupplement, serviceExtension, certificate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);",
        [
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
        ],
        // SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        // ERROR FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const updateSalaryProfile = (
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
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE salaryProfiles SET title = ?, startDate = ?, endDate = ?, hourly = ?, nightExtra = ?, weekendExtra = ?, holidayExtra = ?, monthlyExtra = ?, foodMoney = ?, functionSupplement = ?, serviceExtension = ?, certificate = ? WHERE id = ?;',
        [
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
          id,
        ],
        // SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        // ERROR FUNCTION
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const removeSalaryProfile = id => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM salaryProfiles WHERE id = ?;',
        [id],
        // SUCCESS FUNCTION
        (_, result) => {
          resolve(result);
        },
        // ERROR FUNCTION
        (_, err) => {
          reject(err);
        }
      )
    })
  })
  return promise;
}