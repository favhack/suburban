// HomePage.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bigContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={styles.settingsIconTO}
        >
          <Image
            style={styles.settingsIcon}
            source={require("./assets/icons/Settings.png")}
          />
        </TouchableOpacity>

        <View style={styles.skupinaContainer}>
          <View style={styles.skupinaDot}></View>
          <Text style={styles.skupinaTxt}>Skupina 1</Text>

          <TouchableOpacity style={styles.skupinaMenuIconTO}>
            <Image
              style={styles.skupinaMenuIcon}
              source={require("./assets/icons/skupinaMenuIcon.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.plányContainer}></View>
      </View>
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
    top: 5,
    left: 10,
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  bigContainer: {
    width: 350,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  skupinaContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 180,
    height: 40,
    backgroundColor: "rgba(242, 233, 233, 0.6)",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  skupinaDot: {
    backgroundColor: "#72BE47",
    width: 25,
    height: 25,
    borderRadius: 100,
    position: "absolute",
    left: 10,
  },
  skupinaTxt: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    position: "absolute",
    left: 42,
  },
  skupinaMenuIconTO: {
    position: "absolute",
    right: 10,
  },
  skupinaMenuIcon: {
    width: 11,
    height: 20,
  },
  plányContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "rgba(242, 233, 233, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 60,
    borderRadius: 15,
  },
});

export default HomePage;
