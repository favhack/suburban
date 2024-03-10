// HomePage.js
import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
	Modal,
	TouchableHighlight
} from "react-native";
import PlanContainer from "./PlanContainer";

import API from "./API.js"



function getAllLocalImages() {
	let images = [];
	let i = 0;
	while (true) {
		let image = localStorage.getItem(i);
		// console.log(image);
		if (image == null) {
			break;
		}

		images[i] = image;
		i++;
	}

	return images;
}


const HomePage = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [lastSelectedImage, setImage] = useState('')

	function setLastSelectedImage(image) {
		setImage(image);
		setModalVisible(true);
	}

	setInterval(async () => {
		const response = await API.imgSync();
		const images = response["images"];
		console.log(images);
		if (response != null) {
			for (i = 0; i < images.length; ++i) {
				localStorage.setItem(i, images[i].url);
			}
			window.location.reload();
		}
	}, 300 * 1000);

	return (
		<View style={styles.container}>
			<View style={styles.bigContainer}>
				<TouchableOpacity
					onPress={() => navigation.navigate("Settings")}
					style={styles.settingsIconTO}
				>
					<Image
						style={styles.settingsIcon}
						source={require("./assets/icons/Settings.png")}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.skupinaMenuIconTO}
					onPress={() => navigation.navigate("Struktura")}
				>
					<View style={styles.skupinaContainer}>
						<View style={styles.skupinaDot}></View>
						<Text style={styles.skupinaTxt}>Skupina 1</Text>

						<Image
							style={styles.skupinaMenuIcon}
							source={require("./assets/icons/skupinaMenuIcon.png")}
						/>
					</View>
				</TouchableOpacity>

				<Modal
					animationType="none"
					transparent={false}
					visible={modalVisible}
					onRequestClose={() => {
						console.log('Modal has been closed.');
						setModalVisible(!modalVisible);
					}}>
					<View style={styles.modal}>
						<Image
							style={{ width: '60%', height: 800, resizeMode: 'stretch' }}
							source={{ uri: lastSelectedImage }}
						/>

						<TouchableHighlight style={styles.touchableButton}
							onPress={() => { setModalVisible(!modalVisible) }}>
							<Text style={styles.text}>Close Modal</Text>
						</TouchableHighlight>
					</View>
				</Modal>

				<View style={styles.marginTopContainer}>
					<View>
						<View style={styles.plányContainer}>
							<Text style={styles.title}>Obrázkové struktury</Text>
							<PlanContainer planName={"Skola"} />
							<PlanContainer planName={"Kontiš"} />
							<TouchableOpacity
								style={styles.addButtonTO}
								onPress={() => navigation.navigate("Tags")}
							>
								<Text style={styles.addTxt}>Přidej</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.latestImgsContainer}>
							<Text style={styles.title2}>Galerie</Text>
							<FlatList
								data={getAllLocalImages()}
								renderItem={({ item }) => (
									< TouchableOpacity onPress={() => setLastSelectedImage("data:image/png;base64," + item)}>
										<Image
											source={{ uri: "data:image/png;base64," + item }}
											style={styles.imageStyle}
											resizeMode="cover"
										/>
									</TouchableOpacity>
								)}
								keyExtractor={(item, index) => index.toString()}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
							<TouchableOpacity>
								<Text style={styles.moreTxt}>Více...</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity
							onPress={() => navigation.navigate("Prompt")}
							style={styles.loginButtonTO}
						>
							<View>
								<Text style={styles.loginText}>Vygenerovat obrázek</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View >
	);
};

const styles = StyleSheet.create({
	imageStyle: {
		width: 100,
		height: 100,
		marginRight: 10,
		borderRadius: 5,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#89AFCE",
	},
	title: {
		fontSize: 20,
		marginRight: 150,
		marginTop: 10,
	},
	subtitle: {
		fontSize: 16,
		color: "#606060",
	},
	settingsIconTO: {
		position: "absolute",
		top: 5,
		left: 10,
	},
	settingsIcon: {
		width: 30,
		height: 30,
	},
	bigContainer: {
		width: 350,
		height: "100%",
		alignItems: "center",
		marginTop: 100,
	},
	skupinaContainer: {
		position: "absolute",
		top: 0,
		right: 0,
		width: 180,
		height: 40,
		backgroundColor: "rgba(242, 233, 233, 0.6)",
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	skupinaDot: {
		backgroundColor: "#72BE47",
		width: 25,
		height: 25,
		borderRadius: 100,
		position: "absolute",
		left: 10,
	},
	skupinaTxt: {
		fontSize: 16,
		color: "#000",
		fontWeight: "bold",
		position: "absolute",
		left: 42,
	},
	skupinaMenuIconTO: {
		position: "absolute",
		right: 0,
	},
	skupinaMenuIcon: {
		width: 11,
		height: 20,
		position: "absolute",
		right: 15,
	},
	plányContainer: {
		width: "100%",
		height: 250,
		backgroundColor: "rgba(242, 233, 233, 0.6)",
		alignItems: "center",
		borderRadius: 15,
		marginBottom: 30,
	},
	insideContainer: {
		fontSize: 28,
		fontWeight: "bold",
	},
	insideContainer: {
		fontSize: 28,
		fontWeight: "bold",
	},
	marginTopContainer: {
		marginTop: 60,
		width: "100%",
	},
	addButtonTO: {
		backgroundColor: "rgba(104, 179, 249, 0.62)",
		width: 90,
		height: 35,
		borderRadius: 15,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 240,
		marginBottom: 10,
	},
	addTxt: {
		fontSize: 15,
		color: "#000",
	},
	latestImgsContainer: {
		width: "100%",
		height: 175,
		backgroundColor: "rgba(242, 233, 233, 0.6)",
		alignItems: "center",
		position: "relative",
		borderRadius: 15,
		marginBottom: 30,
	},
	title2: {
		fontSize: 20,
		marginRight: 150,
		marginTop: 10,
		marginBottom: 10,
	},
	moreTxt: {
		fontSize: 15,
		color: "#615E5E",
		marginBottom: 5,
		marginLeft: 280,
	},

	modal: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#89AFCE',
		justifyContent: 'center',
		// padding: 10,
	},
	text: {
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
	},
	touchableButton: {
		width: '70%',
		padding: 10,
		backgroundColor: '#f06292',
		marginBottom: 10,
		marginTop: 30,
	},
});

export default HomePage;
