import react from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";

export default function App() {
  return <RestaurantDetail />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
