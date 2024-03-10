import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button, Image } from 'react-native';
import { getCurrentUser } from 'aws-amplify/auth';
import API_CLIENT from './API';

const PromptPage = () => {
	const [realistic, setRealistic] = useState(false);
	const [prompt, setPrompt] = useState('');

	const callFunction = async () => {
		try {
			const { username, userId, signInDetails } = await getCurrentUser();

			const result = API_CLIENT.imgGenerate(prompt, userId, realistic);
			console.log("AI result: ", result);
		} catch (e) {
			console.log("Failed during fake API call.", e);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.navigate("Home")}
				style={styles.BackIconTO}
			>
				<Image
					style={styles.iconBack}
					source={require("./assets/icons/back-button.png")}
				/>
			</TouchableOpacity>
			<TextInput
				style={styles.input}
				onChangeText={setPrompt}
				value={prompt}
				placeholder="Enter your prompt"
			/>
			<View style={styles.radioContainer}>
				<TouchableOpacity
					style={[styles.radio, realistic === true && styles.radioSelected]}
					onPress={() => setRealistic(true)}
				>
					<Text>Realistic: True</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.radio, realistic === false && styles.radioSelected]}
					onPress={() => setRealistic(false)}
				>
					<Text>Realistic: False</Text>
				</TouchableOpacity>
			</View>
			<Button title="Submit" onPress={callFunction} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#89AFCE',
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: '80%',
		backgroundColor: '#FFF',
	},
	radioContainer: {
		flexDirection: 'row',
		margin: 10,
	},
	radio: {
		alignItems: 'center',
		padding: 10,
		marginHorizontal: 5,
		backgroundColor: '#EFEFEF',
		borderRadius: 5,
	},
	radioSelected: {
		backgroundColor: '#CDEFEF',
	}, iconBack: {
		width: 64,
		height: 64,
	}

});

export default PromptPage;
