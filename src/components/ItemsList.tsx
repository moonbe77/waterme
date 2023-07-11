import React from "react";
import { View, Text } from "react-native";

function ItemsList(props: { label: number }) {
  return (
    <View>
      <Text>{props.label}</Text>
    </View>
  );
}

export default ItemsList;
