import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { AntDesign } from "@expo/vector-icons"; // Ensure you have expo installed or use react-native-vector-icons

const Struktura = () => {
  const navigation = useNavigation(); // Initialize the navigation hook
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>Skupina 1</Text>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#89AFCE", // Adjust the background color as needed
    alignItems: "center",
    justifyContent: "center",
  },
  groupContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 25, // Adjust the border radius as needed
    // Add shadows for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Add elevation for Android
    elevation: 5,
  },
  groupTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18, // Adjust the font size as needed
  },
  addButton: {
    // Add padding as needed
  },
  BackIconTO: {
    position: "absolute",
    top: 60,
    left: 32,
    width: 32,
    height: 32,
  },
  iconBack: {
    width: 30,
    height: 30,
    width: 32,
    height: 32,
  },
});

export default Struktura;
