import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

function index(props) {
  return (
    <View>
      <Text>HOME PAGE inside HOMe folder</Text>
      <Link href="/(tabs)/feed">
        <Text>Go to feed</Text>
      </Link>
    </View>
  );
}

export default index;
