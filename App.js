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
import AboutPage from "./AboutPage.js"
import PromptPage from "./PromptPage.js"

import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

import API_CLIENT from "./API.js"

import { getCurrentUser } from 'aws-amplify/auth';

const Stack = createStackNavigator();

async function isUserLogged() {
	try {
		const { username, userId, signInDetails } = await getCurrentUser();
		if (userId != null) {
			return true;
		}
	} catch (error) {
		console.log("Error: ", error);
	}
	return false;
}


// async function trySignOut() {
// 	console.log("Signing out the current user");
// 	try {
// 		await signOut();
// 		console.log("Signed out.");
// 	} catch (error) {
// 		console.log("Error signing out:", error);
// 		//TODO: Toast for errors
// 	}
// }

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>

				{isUserLogged() == true ?
					<Stack.Screen name="Login" component={LoginPage} />
					:
					<Stack.Screen name="Home" component={HomePage} />
				}

				{isUserLogged() == true ?
					<Stack.Screen name="Home" component={HomePage} />
					:
					<Stack.Screen name="Login" component={LoginPage} />
				}

				<Stack.Screen name="SignUp" component={SignUpPage} />
				<Stack.Screen name="SignUpConfirm" >
					{(props) => <SignUpConfirmPage {...props} username />}
				</Stack.Screen>

				<Stack.Screen name="Settings" component={SettingsPage} />
				<Stack.Screen name="About" component={AboutPage} />
				<Stack.Screen name="Tags" component={Tags} />
				<Stack.Screen name="PlanContainer" component={PlanContainer} />
				<Stack.Screen name="Struktura" component={Struktura} />
				<Stack.Screen name="Prompt" component={PromptPage} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};


export default App;
