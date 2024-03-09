import { TextInput, View } from "react-native";


const AboutPage = ({ navigation }) => {
	return (
		<View>
			<TextInput>Autoři: Petr Urban, David Bubik, Jiří Trefil, Milan Horínek, Jan Hereš</TextInput>
			<TextInput>Copyright @2024</TextInput>
		</View>
	);
};

export default AboutPage;
