// HomePage.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        style={styles.settingsIconTO}
      >
        <Image
          style={styles.settingsIcon}
          source={require("./assets/icons/Settings.png")}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to the Home Page</Text>
      <Text style={styles.subtitle}>This is a basic home page layout.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#89AFCE",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#606060",
  },
  settingsIconTO: {
    position: "absolute",
    top: 50,
    left: 25,
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
});

export default HomePage;
