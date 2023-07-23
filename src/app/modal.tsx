import { StatusBar } from "expo-status-bar";
import {
  Alert,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
} from "react-native";
import { themedComponents } from "../theme/common_styles";
import { schedulePushNotification } from "../service/pushNotifications";
import RNDateTimePicker from "@react-native-community/datetimepicker";
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
    db.transaction(
      (tx) => {
        tx.executeSql(
          `create table if not exists plants (id integer primary key not null, 
            name text, 
            type text, 
            image text, 
            remainder text, 
            lastWatered text, 
            nextWatering text, 
            lastFertilized text, 
            nextFertilizing text,
            notificationTime text, 
            notes text)`
        );
      },
      (error) => {
        console.log("error creating table ", error);
      },
      () => {
        console.log("Table created successfully");
      }
    );
  }, []);

  const dropDb = () => {
    console.log("dropping db");
    db.transaction(
      (tx) => {
        tx.executeSql("DROP TABLE IF EXISTS plants");
      },
      (error) => {
        console.log("error", error);
      },
      () => {
        console.log("success");
      }
    );
  };

  const addPlant = () => {
    console.log("adding plant", { info });

    if (!info?.name) {
      Alert.alert("Please fill info");
      return;
    }

    // if nextWatering is  set, set remainder to nextWatering
    if (info?.nextWatering) {
      // convert date to seconds
      const remainder = new Date(Number(info.nextWatering)).getTime() / 1000;
      console.log("remainder", remainder);

      schedulePushNotification({
        content: {
          title: "Watering reminder",
          body: `Don't forget to water ${info.name}`,
          data: { data: "goes here data prop", url: "/details/1" },
        },
        trigger: { seconds: remainder },
      });
    }

    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into plants (name, type, image, remainder, nextWatering, nextFertilizing, notificationTime) values (?, ?, ?, ?,?,?,?)",
          [
            info.name,
            info.type,
            info.image,
            info.nextWatering,
            new Date(Number(info.nextWatering)).getTime() / 1000,
            info.nextFertilizing,
            info.notificationTime.toISOString(),
          ]
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
        <View style={styles.flexRow}>
          <Text style={styles.title}>Add New</Text>
          <Pressable
            onPress={dropDb}
            // style={themedComponents.pressable.button}
          >
            <Text
            //  style={themedComponents.pressable.text }
            >
              DROP TABLE DANGER
            </Text>
          </Pressable>
        </View>
        <View style={styles.formWrapper}>
          <TextInput
            id="name"
            onChangeText={(value) => handleChange("name", value)}
            placeholder="Name"
            style={themedComponents.input.input}
          />
          {/* <TextInput
            id="type"
            onChangeText={(value) => handleChange("type", value)}
            placeholder="type"
            style={themedComponents.input.input}
          />
          <TextInput
            id="image"
            onChangeText={(value) => handleChange("image", value)}
            placeholder="image url"
            style={themedComponents.input.input}
          />
          <TextInput
            id="image"
            onChangeText={(value) => handleChange("remainder", value)}
            placeholder="remainder"
            style={themedComponents.input.input}
          /> */}

          <TextInput
            id="image"
            inputMode="numeric"
            onChangeText={(value) => handleChange("nextWatering", value)}
            placeholder="Cada cuanto regar en dias"
            style={themedComponents.input.input}
          />
          <TextInput
            id="image"
            inputMode="numeric"
            onChangeText={(value) => handleChange("nextFertilizing", value)}
            placeholder="next fertilizing interval in days"
            style={themedComponents.input.input}
          />
          <View>
            <Text>Notification Time</Text>
            <RNDateTimePicker
              mode="time"
              value={info.notificationTime || new Date()}
              onChange={(event, selectedDate) => {
                console.log({ event, selectedDate });
                handleChange("notificationTime", selectedDate);
              }}
            />
          </View>
          <View style={styles.flexRow}>
            <Pressable
              onPress={addPlant}
              style={themedComponents.pressable.button}
            >
              <Text style={themedComponents.pressable.text}>Add ITEM</Text>
            </Pressable>
          </View>
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
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
