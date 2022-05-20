import { View, Text, Image } from "react-native";
import React from "react";
const image =
  "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/vegetarian-indian-dinner-recipes.jpg";

const title = "Farmhouse kitchen Thai Cuisine";

const description = "Thai . comfort Food . $$ . 💳 . 4 ⭐️ (2913+)";

export default function () {
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantTitle title={title} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image
    source={{
      uri: props.image,
    }}
    style={{ width: "100%", height: 200 }}
  />
);

const RestaurantTitle = (props) => (
  <Text
    style={{
      fontSize: 30,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.title}
  </Text>
);

const RestaurantDescription = (props) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: "400",
      fontSize: 15.5,
    }}
  >
    {props.description}
  </Text>
);
