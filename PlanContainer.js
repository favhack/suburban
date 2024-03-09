import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-web-linear-gradient";

// Add a prop to the component function
const PlanContainer = ({ planName }) => {
	return (
		<View style={styles.container}>
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
