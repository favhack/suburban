import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PlanMenu from './PlanMenu';
import Recents from './Recents';
import Search from './Search';
import Setting from './Setting';
import Group from './Group';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Setting/>
        <Group/>
      </View>
      <PlanMenu/>
      <Recents/>
      <Search/>
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
