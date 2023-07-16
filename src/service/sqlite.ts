import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

export function openDatabase() {
  // if (Platform.OS === "ios") {
  //   return {
  //     transaction: () => {
  //       return {
  //         executeSql: () => { },
  //       };
  //     },
  //   };
  // }

  const db = SQLite.openDatabase("plants.db");
  return db;
}


const createDb = `
CREATE TABLE IF NOT EXISTS "plants" (
  "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
  "name"	TEXT NOT NULL,
  "image"	TEXT NOT NULL,
  "watering"	INTEGER NOT NULL,
  "fertilizer"	INTEGER NOT NULL,
  "lastWatering"	TEXT NOT NULL,
  "lastFertilizer"	TEXT NOT NULL,
  "nextWatering"	TEXT NOT NULL,
  "nextFertilizer"	TEXT NOT NULL,
  "wateringInterval"	INTEGER NOT NULL,
  "fertilizerInterval"	INTEGER NOT NULL,
  "wateringIntervalType"	TEXT NOT NULL,
  "fertilizerIntervalType"	TEXT NOT NULL,
  "wateringNotification"	INTEGER NOT NULL,
  "fertilizerNotification"	INTEGER NOT NULL,
  "wateringNotificationId"	INTEGER NOT NULL,
  "fertilizerNotificationId"	INTEGER NOT NULL
);
)`