import { View, Text, ScrollView } from "react-native";
import React from "react";
import About from "../components/restaurantDetail/About";
import { Divider } from "react-native-elements";
import Menuitems from "../components/restaurantDetail/Menuitems";

export default function RestaurantDetail() {
  return (
    <View>
      <About />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      {/* <ScrollView> */}
      <Menuitems />
      {/* </ScrollView> */}
    </View>
  );
}
