import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native'; // Import Image component

const Pikto = props => {
	return (
		<View>
			<Text>{props.name}</Text>
			<Image source={{ uri: props.imagePath }} style={{ width: 20, height: 20 }} />
		</View>
	);
};

export default function Recents() {
	return (
		<View style={styles.container}>
			<Text>Nedávno zobrazené</Text>
			<Image source='./assets/favicon.png' />
			<Pikto name="a" imagePath="./assets/favicon.png" />
			<Pikto name="b" imagePath="./assets/favicon.png" />
			<Pikto name="c" imagePath="./assets/favicon.png" />
			<Button title={"Více ..."} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
