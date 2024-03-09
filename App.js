import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PlanMenu from "./PlanMenu";
import Recents from "./Recents";
import Search from "./Search";
import Group from "./Group";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import SettingsPage from "./SettingsPage";

import {
  Authenticator,
  useAuthenticator,
  withAuthenticator,
} from "@aws-amplify/ui-react-native";

import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";

import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";

Amplify.configure(amplifyconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

const App = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SignOutButton />
      </Authenticator>
    </Authenticator.Provider>
  );
};

export default withAuthenticator(App);
