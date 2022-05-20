import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import RestaurantItem, {
  localRestaurants,
} from "../components/home/RestaurantItem";
import BottomTab from "../components/home/BottomTab";
import { Divider } from "react-native-elements";

export default function Home() {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", height: "100%" }}>
      <View style={{ backgroundColor: "white", padding: 16 }}>
        <HeaderTabs />
        <SearchBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItem restaurantData={restaurantData} />
      </ScrollView>
      <Divider width={1} />
      <BottomTab />
    </SafeAreaView>
  );
}
