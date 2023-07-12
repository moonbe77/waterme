import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageURISource,
  ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { colors } from "../../../theme/colors";

function Feed(props) {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.image} style={styles.image} contentFit="cover" />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.background,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 5,
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  cardContent: {
    position: "absolute",
    padding: 16,
    backgroundColor: "#fff9",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 32,
    color: "#f1f",
  },
  type: {
    fontSize: 16,
  },
});

//list of plants
const data = [
  {
    id: 1,
    name: "Plant 1",
    type: "type 1",
    image:
      "https://images.unsplash.com/photo-1597305877032-0668b3c6413a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget velit vitae libero sodales aliquet. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquam nisl, vitae aliquam nisl nisl vitae nisl. Sed euismod, nisl quis aliquam ultricies, nisl nisl aliquam nisl, vitae aliquam nisl nisl vitae nisl.",
    timer: new Date(),
  },
  {
    id: 2,
    name: "Plant 2",
    type: "type 2",
    image:
      "https://images.unsplash.com/photo-1555037015-1498966bcd7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    description: "test",
    timer: new Date(),
  },
];
