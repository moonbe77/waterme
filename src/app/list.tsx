import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

function list(props) {
  return (
    <View>
      <Link href="..">
        <Text>Go Back</Text>
      </Link>
      <Link href="/feed/">
        <Text>Feed</Text>
      </Link>
      <Text> LIST PAGE</Text>
    </View>
  );
}

export default list;
