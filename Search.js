import { StyleSheet, Text, View, Image} from 'react-native';

export default function PlanMenu() {
  return (
    <View style={styles.container}>
      <Text>Vyhledávat obrázky</Text>
      <Image source={{uri: './assets/icons/loupe.png'}} style={{width:20, height: 20}}/>
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
