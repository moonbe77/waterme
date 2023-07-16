import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

// import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Link, useRouter } from "expo-router";

export default function ModalScreen(props) {
  const navigation = useRouter();
  console.log("MODAL PROPS", navigation);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Modal</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Link
          href="/details/123"
          // onPress={() => {
          //   navigation.push("/details/");
          // }}
        >
          <Text>Go to Details</Text>
        </Link>
        {/* <EditScreenInfo path="app/modal.tsx" /> */}

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
