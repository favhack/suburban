import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";


const LoginPage = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate("Home")}
				style={styles.loginBtnTO}
			>
				<View style={styles.loginBtn}>
					<Text style={styles.loginTxt}>Přihlásit se</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity style={styles.forgotPasswTO}>
				<Text style={styles.forgotPassTxt}>Zapomenuté heslo?</Text>
			</TouchableOpacity>

			<View style={styles.registraceContainer}>
				<Text style={styles.registraceTxt1}>Ještě nemáte účet?</Text>
				<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
					<Text style={styles.registraceTxt2}>Zaregistrovat se</Text>
				</TouchableOpacity>
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
	emailButton: {
		backgroundColor: "#fff",
		height: 55,
		width: 350,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 40,
		position: "absolute",
		top: 300,
	},
	loginInput: {
		fontSize: 18,
		position: "absolute",
		left: 25,
		height: "100%",
		width: 300,
	},
	hesloButton: {
		backgroundColor: "#fff",
		height: 55,
		width: 350,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 40,
		position: "absolute",
		top: 370,
	},
	loginBtnTO: {
		borderRadius: 40,
		height: 55,
		width: 350,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		backgroundColor: "#0B7B9A",
	},
	loginBtn: {
		height: "100%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	loginTxt: {
		fontSize: 18,
		color: "white",
		fontWeight: "bold",
	},
	forgotPasswTO: {
		position: "absolute",
		top: 460,
	},
	forgotPassTxt: {
		fontSize: 15,
		color: "#E03B3C",
	},
	registraceContainer: {
		position: "absolute",
		top: 530,
		left: "5%",
	},
	registraceTxt1: {
		fontSize: 13,
		color: "#fff",
	},
	registraceTxt2: {
		fontSize: 16,
		color: "#E03B3C",
	},
});

export default LoginPage;
