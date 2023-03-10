import React, {useEffect} from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//  import { NavigationContainer } from '@react-navigation/native';
import Todolist from './todolist';
import About from './about';
import Bookmark from './bookmark';
import Completed from "./completed"

import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'todo.db' });

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

const Drawer = createDrawerNavigator();

export default function Welcome() {
  return (
      <Drawer.Navigator initialRouteName="Todolist">
        <Drawer.Screen name="Todolist" component={Todolist} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Completed" component={Completed} />
        <Drawer.Screen name="Bookmark" component={Bookmark} />
      </Drawer.Navigator>
   
  );
}
