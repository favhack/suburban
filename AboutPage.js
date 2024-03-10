import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";


const AboutPage = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate("Settings")}
				style={styles.BackIconTO}
			>
				<Image
					style={styles.iconBack}
					source={require("./assets/icons/back-button.png")}
				/>
			</TouchableOpacity>

			<Text>Autoři: Hackers #Hackathon 2024</Text>
			<Text>Copyright @2024</Text>
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


export default AboutPage;
