// HomePage.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, FlatList} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import PlanContainer from "./PlanContainer";
import { Gallery } from "react-grid-gallery";



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


<View style={styles.skupinaContainer}>
          
          <View style={styles.skupinaDot}></View>
          <Text style={styles.skupinaTxt}>Skupina 1</Text>

          <TouchableOpacity style={styles.skupinaMenuIconTO}   onPress={() => navigation.navigate('Struktura')}>
            <Image
              style={styles.skupinaMenuIcon}
              source={require("./assets/icons/skupinaMenuIcon.png")}
            />
          </TouchableOpacity>
        </View>
       
<View style={styles.marginTopContainer}>

<View style={styles.plányContainer}>
          <Text style={styles.title}>
            Obrázkové struktury
          </Text>
        <PlanContainer planName={"Skola"}/>
        <TouchableOpacity
               style={styles.addButton}
               onPress={() => navigation.navigate('Tags')}>
              <Text style={styles.addButton}>Přidej</Text> 
            </TouchableOpacity>
        </View>

        <View style={styles.plányContainer}>
          <Text style={styles.title}>Nedávno zobrazené</Text>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <Image source={{ uri: item.src }} style={styles.imageStyle} resizeMode="cover" />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
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
  addButton: {
    backgroundColor: '#68b3F9',
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 30,
    padding:5,
    margin:5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#89AFCE",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 32,
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
    right: 10,
  },
  skupinaMenuIcon: {
    width: 11,
    height: 20,
  },
  plányContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "rgba(242, 233, 233, 0.6)",
    alignItems: "center",
    position: "relative",
    borderRadius: 15,
    marginBottom: 30,
  
  },
  insideContainer: {
    fontSize: 28,
    fontWeight: "bold",
  },
  marginTopContainer: {
    marginTop:60,
    width: "100%"
  }
});



export default HomePage;
