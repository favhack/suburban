import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Tags = () => {
  const navigation = useNavigation(); // Initialize the navigation hook
  const [buttons, setButtons] = useState([
    { id: 1, name: 'Kočka', isPressed: false },
    { id: 2, name: 'Pes', isPressed: false },
    { id: 3, name: 'Dům', isPressed: false },
    { id: 4, name: '...', isPressed: false },
  ]);

  const handlePress = (id) => {
    
    console.log("Pressed button ID:", id);
    const updatedButtons = buttons.map(button => {
    
      if (button.id === id) {
        return { ...button, isPressed: !button.isPressed };
      }
      return button;
    });
    setButtons(updatedButtons);
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
      <View style={styles.bigContainer}>
        <View style={styles.btnback}>
          <View style={styles.tagcontainer}>
            {buttons.map((button) => (
              <TouchableOpacity
                key={button.id}
                style={[styles.button, button.isPressed && styles.buttonPressed]}
                onPress={() => handlePress(button.id)}
            >
                <Text style={styles.text}>{button.name}</Text>
              </TouchableOpacity>
          ))}
          </View>
        </View>

        <ScrollView style={styles.ScrollView}>

        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#89AFCE',
  },
  iconBack:{
    width:64,
    height:64,
  },
  BackIconTO:{
    width:64,
    height:64,
    position:"absolute",
    
  },

  BackIconTO: {
    position: "absolute",
    top: 60,
    left: 32,
    width:32,
    height:32,
  },
  iconBack: {
    width: 30,
    height: 30,
    width:32,
    height:32,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 5,
    borderRadius: 25,
    width: 60,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    backgroundColor: 'grey'
  },
  text: {
    color: '#000000',
    fontSize: 11,
    fontWeight: "bold"
  },
  tagcontainer: {
    flexDirection: 'row',
    justifyContent: "center"
  },
  btnback: {
    backgroundColor: '#F2E9E9',
    borderRadius: 30,
    width: "90%",
    height: "3.5%",
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center"
  },
  bigContainer: {
    backgroundColor: 'rgba(242, 233, 233, 0.6)',
    width: 340,
    height: 2000,
    alignItems: "center",
    marginTop: 115,
    borderRadius: 25
  },

  ScrollView: {
    marginTop: 20
  }

});

export default Tags;