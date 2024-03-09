import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-web';


export default function Group() {
  return (
    <View style={styles.container}>
      <Image source={{uri: './assets/icons/button.png'}} style={{width:20, height: 20}}/>
      <Text>Obrázkové plány</Text>
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
