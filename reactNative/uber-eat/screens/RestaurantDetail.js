import { View, Text } from "react-native";
import React from "react";
import About from "../components/restaurantDetail/About";
import { Divider } from "react-native-elements";

const image =
  "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/vegetarian-indian-dinner-recipes.jpg";

const title = "Farmhouse kitchen Thai Cuisine";

const description = "Thai . comfort Food . $$ . 💳 . 4 ⭐️ (2913+)";

export default function RestaurantDetail() {
  return (
    <View>
      <About />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
    </View>
  );
}
