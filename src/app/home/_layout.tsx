import { Slot } from "expo-router";
import { View, Text } from "react-native";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
}

const Header = () => (
  <View>
    <Text>HEADER</Text>
  </View>
);

const Footer = () => (
  <View>
    <Text>FOOTER</Text>
  </View>
);
