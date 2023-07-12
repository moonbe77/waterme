import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
function DetailsWrapper(props) {
  const { slug } = useLocalSearchParams();
  console.log(slug);
  return (
    <View>
      <Link href="/">Go to Home</Link>
      <Text>{slug}</Text>
    </View>
  );
}

export default DetailsWrapper;
