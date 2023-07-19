import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageURISource,
  ImageSourcePropType,
  ScrollView,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { colors } from "../../theme/colors";
import { Link, useNavigation, useFocusEffect, useRouter } from "expo-router";
import { openDatabase } from "../../service/sqlite";
import { IPlant } from "../../models/plantsModel";
const db = openDatabase();
function Feed(props) {
  const router = useRouter();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [info, setInfo] = React.useState<any[]>([]);

  // console.log("PROPS ", { props, router, navigation });
  const getData = useCallback(() => {
    setIsLoading(true);
    db.transaction(
      (tx) => {
        tx.executeSql(`select * from plants`, [], (_, { rows }) => {
          setInfo(rows._array);
        });
      },
      null,
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  useFocusEffect(useCallback(getData, []));

  const deleteAll = () => {
    setIsLoading(true);

    db.transaction(
      (tx) => {
        tx.executeSql(`delete from plants`, [], (_, { rows }) => {
          setInfo(rows._array);
        });
      },
      null,
      () => {
        console.log("success");
        setIsLoading(false);
      }
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable onPress={deleteAll}>
          <Text>Delete all</Text>
        </Pressable>
      </View>
      <FlatList
        data={info}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={() => {
          getData();
        }}
      />
    </View>
  );
}

export default Feed;

const Item = ({ item }: { item: IPlant }) => (
  <View style={styles.card} key={item.id}>
    <Image source={item.image} style={styles.image} contentFit="cover" />
    <Link href={`/details/${item.id}`} style={styles.link}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    </Link>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: colors.grape,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 5,
    height: 200,
    shadowOffset: { width: 0, height: 0 },
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  link: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "#fff9",
  },
  cardContent: {
    padding: 16,
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
