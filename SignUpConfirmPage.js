import { useState } from "react";

import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	TextInput,
} from "react-native";

import { confirmSignUp } from "aws-amplify/auth";


async function tryConfirmSignUp(username, confirmationCode, navigation) {
	try {
		const { isSignUpComplete, nextStep } = await confirmSignUp({
			username,
			confirmationCode
		});

		if (isSignUpComplete) {
			console.log("User registration confirmed: ", username);
			navigation.navigate("Login");
			return;
		}
	} catch (error) {
		console.log('Error confirming sign up', error);
	}
}


const SignUpConfirmPage = ({ navigation, route }) => {
	const [confirmationCode, setConfirmationCode] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.loginInputField}>
				<TextInput
					style={styles.loginInput}
					placeholder={"Ověřovací kód"}
					autoCapitalize="none"
					value={confirmationCode}
					onChangeText={setConfirmationCode}
				/>
			</View>


			<TouchableOpacity
				onPress={() => tryConfirmSignUp(route.params.username, confirmationCode, navigation)}
				style={styles.loginBtnTO}
			>
				<View style={styles.loginBtn}>
					<Text style={styles.loginTxt}>Ověřit</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.registraceContainer}>
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

	loginInputField: {
		backgroundColor: "#fff",
		height: 55,
		width: 350,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 40,
		position: "absolute",
		top: 300,
	},

});


export default SignUpConfirmPage;
