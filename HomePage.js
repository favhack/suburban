// HomePage.js
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import PlanContainer from "./PlanContainer";

import API from "./API.js"


function getAllLocalImages() {
	let images = [];
	let i = 0;
	while (true) {
		let image = localStorage.getItem(i);
		console.log(image);
		console.log(image);
		if (image == null) {
			break;
		}

		images[i] = image;
		i++;
	}

	return images;
}

const HomePage = ({ navigation }) => {
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
	}, 5000);

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

				<View style={styles.marginTopContainer}>
					<View>
						<View style={styles.plányContainer}>
							<Text style={styles.title}>Obrázkové struktury</Text>
							<PlanContainer planName={"Skola"} />
							<PlanContainer planName={"Tvoje máma"} />
							<TouchableOpacity
								style={styles.addButtonTO}
								onPress={() => navigation.navigate("Tags")}
							>
								<Text style={styles.addTxt}>Přidej</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.latestImgsContainer}>
							<Text style={styles.title2}>Nedávno zobrazené</Text>
							<FlatList
								data={getAllLocalImages()}
								renderItem={({ item }) => (
									<Image
										source={{ uri: item.src }}
										style={styles.imageStyle}
										resizeMode="cover"
									/>
								)}
								keyExtractor={(item, index) => index.toString()}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
							<TouchableOpacity>
								<Text style={styles.moreTxt}>Více...</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</View>
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
});

export default HomePage;
