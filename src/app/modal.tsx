import { StatusBar } from "expo-status-bar";
import {
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
} from "react-native";
import * as SQLite from "expo-sqlite";

// import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Link, useRouter } from "expo-router";

import { useEffect, useState } from "react";
import { openDatabase } from "../service/sqlite";
import { IPlant } from "../models/plantsModel";

const db = openDatabase();

export default function ModalScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState<IPlant | null>(null);

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

  // const callDB = () => {
  //   db.transaction(
  //     (tx) => {
  //       tx.executeSql("select * from plants", [], (_, { rows }) => {

  //         setInfo(rows._array);
  //       });
  //     },
  //     null,
  //     () => {
  //       console.log("success");
  //     }
  //   );
  // };

  const addPlant = () => {
    console.log("adding plant");
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into plants (name, type, image) values (?, ?, ?)",
          [info.name, info.type, info.image]
        );
      },
      (error) => {
        console.log("error", error);
      },
      () => {
        console.log("success");
      }
    );
  };

  console.log("info", info);

  const handleChange = (name, value) => {
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
        <View style={styles.formWrapper}>
          <TextInput
            id="name"
            onChangeText={(value) => handleChange("name", value)}
            placeholder="Name"
            style={styles.input}
          />
          <TextInput
            id="type"
            onChangeText={(value) => handleChange("type", value)}
            placeholder="type"
            style={styles.input}
          />
          <TextInput
            id="image"
            onChangeText={(value) => handleChange("image", value)}
            placeholder="image url"
            style={styles.input}
          />
        </View>
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
    // alignItems: "center",
    // justifyContent: "center",
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
  formWrapper: {
    margin: 16,
    flex: 1,
    height: 400,
    gap: 12,
    display: "flex",
    justifyContent: "flex-start",
  },
  input: {
    borderRadius: 8,

    fontSize: 16,
    padding: 8,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    // backgroundColor: "",
    height: 45,
  },
});
