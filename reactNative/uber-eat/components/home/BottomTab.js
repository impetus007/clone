import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTab() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        marginHorizontal: 30,
      }}
    >
      <Icon icon="home" text="Home" />
      <Icon icon="search" text="Search" />
      <Icon icon="shopping-bag" text="Grocery" />
      <Icon icon="receipt" text="Orders" />
      <Icon icon="user" text="Acount" />
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
