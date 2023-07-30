import { StatusBar } from "expo-status-bar";
import { Alert, Platform, StyleSheet } from "react-native";
import { schedulePushNotification } from "../service/pushNotifications";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  Pressable,
  Input,
  Box,
  VStack,
  Text,
  Button,
  Heading,
  useToast,
} from "native-base";
import { View } from "../components/Themed";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { openDatabase } from "../service/sqlite";
import { IPlant } from "../models/plantsModel";
import { calculateNotificationInterval } from "../service/helpers";

const db = openDatabase();

export default function ModalScreen() {
  const [info, setInfo] = useState<IPlant | null>(null);
  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `create table if not exists plants (id integer primary key not null,
            name text,
            type text,
            image text,
            notificationId text,
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
    if (!info?.name) {
      Alert.alert("Please fill info");
      return;
    }

    // if nextWatering is  set, set remainder to nextWatering
    if (info?.nextWatering) {
      // convert interval in days to seconds
      const remainder = calculateNotificationInterval(
        Number(info.nextWatering),
        info.notificationTime
      );

      schedulePushNotification({
        content: {
          title: "Watering reminder",
          body: `Don't forget to water ${info.name}`,
          data: { data: "goes here data prop", url: "/details/1" },
        },
        trigger: { seconds: Number(remainder), repeats: true },
      }).then((res) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              "insert into plants (name, type, image, notificationId, nextWatering, nextFertilizing, notificationTime) values (?, ?, ?, ?,?,?,?)",
              [
                info.name,
                info.type,
                info.image,
                res,
                remainder,
                info.nextFertilizing,
                info?.notificationTime
                  ? info.notificationTime.toISOString()
                  : "",
              ]
            );
          },
          (error) => {
            console.log("error", error);
          },
          () => {
            toast.show({
              title: "Remainder set successfully",
              variant: "top-accent",
              duration: 3000,
              placement: "top",
            });
            //close modal
            navigation.goBack();
          }
        );
      });
    }
  };

  const handleChange = (name, value) => {
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View>
        <Box alignItems="center" mb={4}>
          <Heading size="xl">Set New Remainder</Heading>
        </Box>
        <VStack
          space={4}
          overflow="hidden"
          borderColor="coolGray.400"
          background="gray.700"
          h="full"
          w="full"
          p={4}
          alignItems="center"
        >
          <Input
            id="name"
            onChangeText={(value) => handleChange("name", value)}
            placeholder="Name / Title"
            size="xl"
            isFullWidth={true}
            color={"white"}
          />

          <Input
            // w="1/2"
            id="waterInterval"
            inputMode="numeric"
            onChangeText={(value) => handleChange("nextWatering", value)}
            placeholder="Watering interval in days"
            size="xl"
            color={"white"}
          />
          <Input
            id="fertilizingInterval"
            // w="1/2"
            inputMode="numeric"
            onChangeText={(value) => handleChange("nextFertilizing", value)}
            placeholder="Next fertilizing interval in days"
            size="xl"
            color={"white"}
          />

          <Box w="full">
            <Text color="amber.100">Notification Time</Text>
            <RNDateTimePicker
              style={{ backgroundColor: "white" }}
              themeVariant="light"
              display="spinner"
              mode="time"
              value={info?.notificationTime || new Date()}
              onChange={(event, selectedDate) => {
                console.log({ event, selectedDate });
                handleChange("notificationTime", selectedDate);
              }}
            />
          </Box>
          <Box alignItems="center">
            <Button onPress={addPlant} size="lg">
              Set Reminder
            </Button>
          </Box>
        </VStack>
        <Pressable onPress={dropDb}>
          <Text>DROP TABLE DANGER</Text>
        </Pressable>
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
    backgroundColor: "#ff5",
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
