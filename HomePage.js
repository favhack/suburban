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

const images = [
	{
		src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
		width: 320,
		height: 174,
		isSelected: true,
		caption: "After Rain (Jeshu John - designerspics.com)",
	},
	{
		src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
		width: 320,
		height: 212,
		tags: [
			{ value: "Ocean", title: "Ocean" },
			{ value: "People", title: "People" },
		],
		alt: "Boats (Jeshu John - designerspics.com)",
	},
	{
		src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
		width: 320,
		height: 212,
	},
];

const HomePage = ({ navigation }) => {
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
							<Text style={styles.title}>Nedávno zobrazené</Text>
							<FlatList
								data={images}
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
		height: 250,
		backgroundColor: "rgba(242, 233, 233, 0.6)",
		alignItems: "center",
		position: "relative",
		borderRadius: 15,
		marginBottom: 30,
	},
});

export default HomePage;
