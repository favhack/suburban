import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Add a prop to the component function
const PlanContainer = ({ planName }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#68b3f9", "#ffffff"]}
        style={styles.gradientContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 0 }}
      >
        <TouchableOpacity style={styles.optionButton}>
          {/* Use the planName prop for dynamic text */}
          <Text style={styles.text}>{planName}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text>nasdílet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text>upravit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.deleteText}>SMAZAT</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientContainer: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 15,
  },
  optionButton: {
    // Styling for each touchable option
    marginTop: 5,
    marginBottom: 5,
    // Add more styling as needed
  },
  text: {
    // Styling for the text
  },
  deleteText: {
    color: "red",
    // Add additional styling as needed
  },
});

export default PlanContainer;
