import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("shifts.db");

export const initShiftDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS shifts (id INTEGER PRIMARY KEY NOT NULL, type TEXT NOT NULL, title TEXT NOT NULL, shiftId INTEGER, address TEXT, date TEXT, startTime TEXT NOT NULL, endTime TEXT NOT NULL, overtimePercentage INTEGER, paidLunch INTEGER, note TEXT);",
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
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS favoriteShifts (id INTEGER PRIMARY KEY NOT NULL, shiftId INTEGER );",
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

export const fetchShifts = (props) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        props,
        [],
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

export const insertShift = (
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
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO shifts (type, title, shiftId, address, date, startTime, endTime, overtimePercentage, paidLunch, note) VALUES (?,?,?,?,?,?,?,?,?,?);",
        [
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

export const editShift = (
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
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE shifts SET type = ?, title = ?, shiftId = ?, address = ?, date = ?, startTime = ?, endTime = ?, overtimePercentage = ?, paidLunch = ?, note = ? WHERE id = ?;`,
        [
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
          id,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const removeShift = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM shifts WHERE id = ?;`,
        [id],
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
