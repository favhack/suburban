import { View, Button, TextInput } from "react-native";

// import "react-native-url-polyfill/auto";
// import "react-native-get-random-values";

import LoginPage from "./LoginPage.js"
import HomePage from "./HomePage.js"

import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";

Amplify.configure(amplifyconfig);


// function SignOutButton() {
// 	const { signOut } = useAuthenticator();
// 	return <Button title="Sign Out" onPress={signOut} />;
// }

async function isUserLoggedIn() {
	try {
		await Auth.currentAuthenticatedUser();
		console.log("User is logged in.")
		return true;
	} catch {
		console.log("User is logged out.")
		return false;
	}
}

const App = () => {
	return (
		<View>
			{isUserLoggedIn() ? <HomePage></HomePage> : <LoginPage></LoginPage>}
		</View>
	);
};

export default App
