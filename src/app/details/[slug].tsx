import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { openDatabase } from "../../service/sqlite";

const db = openDatabase();
function DetailsScreen(props) {
  const { slug } = useLocalSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [info, setInfo] = React.useState<any[]>();

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from plants where id=${slug}`,
          [],
          (_, { rows }) => {
            console.log("rows", rows);
            setInfo(rows._array);
          }
        );
      },
      null,
      () => {
        console.log("success");
      }
    );
  }, [slug]);

  return (
    <View>
      <Text>Details</Text>
      <Text>{slug}</Text>
      <Text>{info?.[0]?.name}</Text>
    </View>
  );
}

export default DetailsScreen;
