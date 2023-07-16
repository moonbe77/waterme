import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

function index(props) {
  const { slug } = useLocalSearchParams();

  return (
    <View>
      <Text>Details</Text>
      <Text>{slug}</Text>
    </View>
  );
}

export default index;
