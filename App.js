import { View, StyleSheet } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import LoginPage from "./LoginPage.js"
import HomePage from "./HomePage.js"

import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";

Amplify.configure(amplifyconfig);

function isUserLoggedIn() {
	return false;
	// try {
	// 	await Auth.currentAuthenticatedUser();
	// 	console.log("User is logged in.")
	// 	return true;
	// } catch {
	// 	console.log("User is logged out.")
	// 	return false;
	// }
}


const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{isUserLoggedIn() == false ? <Stack.Screen name="Login" component={LoginPage} />
					: null}

				<Stack.Screen name="Home" component={HomePage} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App
