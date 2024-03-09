import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-web';

const Plan = props => {
  return (
    <View>
      <Text style={styles}>{props.name}</Text>
      <Button title={'nasdílet'} style={styles}/>
      <Button title ={'upravit'}/>
      <Button title = {'smazat'}/>
    </View>
  )
}

export default function PlanMenu() {
  return (
    <View style={styles.container}>
      <Text>Obrázkové plány</Text>
      <Plan name="Škola"/>
      <Plan name="Víkend"/>
      <Button title={"Přidat"}/>
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
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
