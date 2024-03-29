import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Image,
} from "react-native";

import { signUp } from 'aws-amplify/auth';
import { useState } from "react";


async function trySingUp(username, password, email, navigation) {
	try {
		const { isSignUpComplete, userId, nextStep } = await signUp({
			username,
			password,
			options: {
				userAttributes: {
					email,
				},
				// optional
				autoSignIn: false // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
			}
		});

		console.log("User ", username, " created with ID ", userId);

		if (isSignUpComplete == true && nextStep == "DONE") {
			await signIn({
				username: username,
				password: password,
				options: {
					authFlowType: "USER_PASSWORD_AUTH",
				},
			});

			console.log("Signed in: ", username);
			navigation.navigate("Home");
			return;
		}

		navigation.navigate("SignUpConfirm", { username: username });
	} catch (error) {
		console.log('Error signing up:', error);
	}
}


const SignUpPage = ({ navigation }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate("Login")}
				style={styles.BackIconTO}
			>
				<Image
					style={styles.iconBack}
					source={require("./assets/icons/back-button.png")}
				/>
			</TouchableOpacity>


			<View style={styles.usernameButton}>
				<TextInput
					style={styles.loginInput}
					placeholder={"Uživatelské jméno"}
					autoCapitalize="none"
					value={username}
					onChangeText={setUsername}
				/>
			</View>

			<View style={styles.hesloButton}>
				<TextInput
					style={styles.loginInput}
					placeholder={"Heslo"}
					autoCapitalize="none"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
				/>
			</View>

			<View style={styles.emailButton}>
				<TextInput
					style={styles.loginInput}
					placeholder={"Email"}
					autoCapitalize="none"
					value={email}
					onChangeText={setEmail}
				/>
			</View>


			<TouchableOpacity
				onPress={() => trySingUp(username, password, email, navigation)}
				style={styles.loginBtnTO}
			>
				<View style={styles.loginBtn}>
					<Text style={styles.loginTxt}>Zaregistrovat se</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.registraceContainer}>
				<Text style={styles.registraceTxt1}>Již máte účet?</Text>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={styles.registraceTxt2}>Přihlásit se</Text>
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
		position: "absolute",
		left: 25,
		height: "100%",
		width: 300,
	},
	emailButton: {
		backgroundColor: "#fff",
		height: 55,
		width: 350,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 40,
		position: "absolute",
		top: 230,
	},
	usernameButton: {
		backgroundColor: "#fff",
		height: 55,
		width: 350,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 40,
		position: "absolute",
		top: 300,
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
		position: "absolute",
		top: 440,
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
		top: 510,
	},
	forgotPassTxt: {
		fontSize: 15,
		color: "#E03B3C",
	},
	registraceContainer: {
		position: "absolute",
		top: 570,
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

export default SignUpPage;
