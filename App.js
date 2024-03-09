import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


import LoginPage from "./LoginPage.js";
import SignUpPage from "./SignUpPage.js";
import SignUpConfirmPage from "./SignUpConfirmPage.js"
import HomePage from "./HomePage.js";
import SettingsPage from "./SettingsPage.js";
import Tags from "./Tags.js";
import PlanContainer from "./PlanContainer.js";
import Struktura from "./Struktura.js";

import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

import { signOut } from "aws-amplify/auth";

// async function isUserLoggedIn() {
// 	try {
// 		await Auth.currentAuthenticatedUser();
// 		console.log("User is logged in.")
// 		return true;
// 	} catch {
// 		console.log("User is logged out.")
// 		return false;
// 	}
// }
//

async function trySignOut() {
	console.log("Signing out the current user");
	try {
		await signOut();
		console.log("Signed out.");
	} catch (error) {
		console.log("Error signing out:", error);
		//TODO: Toast for errors
	}
}

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={LoginPage} />
				<Stack.Screen name="SignUp" component={SignUpPage} />
				<Stack.Screen name="SignUpConfirm" >
					{(props) => <SignUpConfirmPage {...props} username />}
				</Stack.Screen>
				<Stack.Screen name="Home" component={HomePage} />
				<Stack.Screen name="Settings" component={SettingsPage} />
				<Stack.Screen name="Tags" component={Tags} />
				<Stack.Screen name="PlanContainer" component={PlanContainer} />
				<Stack.Screen name="Struktura" component={Struktura} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

trySignOut();

export default App;
