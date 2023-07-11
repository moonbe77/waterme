import React from "react";
import ItemsList from "../../../components/ItemsList";
import { View, Text } from "react-native";
import { Link } from "expo-router";

function index(props) {
  return (
    <View>
      <Text>HOME PAGE</Text>
      <Link href="/list">
        <Text>Go to list</Text>
      </Link>
    </View>
  );
}

export default index;
