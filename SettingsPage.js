// HomePage.js
import { signOut } from "aws-amplify/auth";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

async function trySignOut(navigation) {
	console.log("Signing out the current user");
	try {
		await signOut();
		console.log("Signed out.");
		navigation.navigate("Login");
	} catch (error) {
		console.log("Error signing out:", error);
		//TODO: Toast for errors
	}
}

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

			<TouchableOpacity
				onPress={() => trySignOut(navigation)}
			>
				<View>
					<Text>Odhlásit se</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => navigation.navigate("About")}
			>
				<View>
					<Text>O aplikaci</Text>
				</View>
			</TouchableOpacity>

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
	BackIconTO: {
		position: "absolute",
		top: 50,
		left: 25,
	},
	iconBack: {
		width: 30,
		height: 30,
	},

});

export default SettingsPage;
