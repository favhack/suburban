import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-web';

export default function Setting() {
  return (
      <Image source={{uri: './assets/icons/setting.png'}} style={{width:20, height: 20}}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    backgroundColor: 'rgb(2,0,36)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 0.7,
  },
});
