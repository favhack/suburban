// HomePage.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const SettingsPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.BackIconTO}
      >
        <Image
          style={styles.iconBack}
          source={require("./assets/icons/back-button.png")}
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
  BackIconTO: {
    position: "absolute",
    top: 60,
    left: 32,
    width:32,
    height:32,
  },
  iconBack: {
    width: 30,
    height: 30,
    width:32,
    height:32,
  },
});

export default SettingsPage;
