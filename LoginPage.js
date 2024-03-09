import { React, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";

import { signIn } from 'aws-amplify/auth';

async function trySignIn(username, password, navigation) {
	console.log("Logging in user: ", username, " ", password)
	try {
		await signIn({
			username: username,
			password: password,
			options: {
				authFlowType: "USER_PASSWORD_AUTH",
			},
		});
		console.log("Signed in: ", username);
		navigation.navigate("Home");
	} catch (error) {
		console.log("Error signing in: ", error);
		//TODO: Toast for errors
	}
};

const LoginPage = ({ navigation }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	return (
		<View style={styles.container}>
			<View style={styles.usernameButton}>
				<TextInput
					style={styles.loginInput}
					placeholder={"Uživatelské jméno"}
					autoCapitalize="none"
					value={username}
					onChangeText={setUsername}
				/>
			</View>

			<View style={styles.passwordButton}>
				<TextInput
					style={styles.loginInput}
					placeholder={"Heslo"}
					autoCapitalize="none"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
				/>
			</View>

			<TouchableOpacity
				onPress={() => trySignIn(username, password, navigation)}
				style={styles.loginButtonTO}
			>
				<View>
					<Text style={styles.loginText}>Přihlásit se</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity style={styles.forgotPasswordTO}>
				<Text style={styles.textForgotPassword}>Zapomenuté heslo?</Text>
			</TouchableOpacity>

			<View style={styles.registrationContainer}>
				<Text style={styles.textAccountNotYet}>Ještě nemáte účet?</Text>
				<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
					<Text style={styles.textRegister}>Zaregistrovat se</Text>
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
	loginInput: {
		fontSize: 18,
		// position: "absolute",
		left: 25,
		height: "100%",
		width: 300,
	},
	usernameButton: {
		backgroundColor: "#fff",
		height: 55,
		width: 350,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 40,
		position: "absolute",
		top: 250,
	},

	passwordButton: {
		backgroundColor: "#fff",
		height: 55,
		width: 350,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 40,
		position: "absolute",
		top: 320,
	},

	loginButtonTO: {
		borderRadius: 40,
		height: 55,
		width: 350,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		top: 400,
		backgroundColor: "#0B7B9A",
	},

	loginText: {
		fontSize: 18,
		color: "white",
		fontWeight: "bold",
	},

	forgotPasswordTO: {
		position: "absolute",
		top: 460,
	},
	textForgotPassword: {
		fontSize: 15,
		color: "#E03B3C",
	},
	registrationContainer: {
		position: "absolute",
		top: 530,
		left: "5%",
	},
	textAccountNotYet: {
		fontSize: 13,
		color: "#fff",
	},
	textRegister: {
		fontSize: 16,
		color: "#E03B3C",
	},
});

export default LoginPage;
