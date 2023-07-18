import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";

// import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Link, useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { openDatabase } from "../service/sqlite";

const db = openDatabase();

export default function ModalScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState<any[]>();

  useEffect(() => {
    const result = db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists plants (id integer primary key not null, name text, type text, image text)"
        );
      },
      () => {
        console.log("error");
      },
      () => {
        console.log("success");
      }
    );
  }, []);

  const callDB = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from plants", [], (_, { rows }) => {
          console.log("rows", rows);
          setInfo(rows._array);
        });
      },
      null,
      () => {
        console.log("success");
      }
    );
  };

  const addPlant = () => {
    console.log("adding plant");
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into plants (name, type, image) values (?, ?, ?)",
          ["test", "test", "test"]
        );
      },
      null,
      () => {
        console.log("success");
      }
    );
  };

  console.log("info", info);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return <Text style={styles.contentWrapper}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Add New</Text>
        <Pressable onPress={addPlant}>
          <Text>Add</Text>
        </Pressable>
        <Pressable onPress={callDB}>
          <Text>Call DB</Text>
        </Pressable>
        <TextInput onChange={handleChange} placeholder="Name" />
        <TextInput onChange={handleChange} placeholder="type" />
        <TextInput onChange={handleChange} placeholder="image url" />
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  line: {
    borderColor: "#eee",
    borderWidth: 1,
    marginVertical: 15,
    width: 60,
    height: 10,
    marginLeft: "50%",
    transform: [{ translateX: -30 }],
    backgroundColor: "gray",
    borderRadius: 10,
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
