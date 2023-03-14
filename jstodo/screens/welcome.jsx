import React, {useEffect} from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//  import { NavigationContainer } from '@react-navigation/native';
import Todolist from './todolist';
import About from './about';
import Bookmark from './bookmark';
import Completed from "./completed";
import Bin from "./bin";

// import { openDatabase } from 'react-native-sqlite-storage';
// const db = openDatabase({ name: 'todo.db' });

function HomeScreen({ navigation }) {
  return (
    <View style={{backgroundColor:"#039dfc", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{backgroundColor:"#039dfc", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function Welcome() {
  return (
      <Drawer.Navigator 
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'blue',
          // width: 240,
        },
        drawerContentOptions:{
          activeTintColor: '#fff', 
          // /* font color for active screen label */
          activeBackgroundColor: '#68f', 
          // /* bg color for active screen */
          inactiveTintColor: 'grey', 
          // /* Font color for inactive screens' labels */
        }
      }}
       initialRouteName="Todolist">
        <Drawer.Screen name="Todolist" component={Todolist} />
        <Drawer.Screen name="Bookmark" component={Bookmark} />
        <Drawer.Screen name="Completed" component={Completed} />
        <Drawer.Screen name="Bin" component={Bin} />
        <Drawer.Screen name="About" component={About} />
        
      </Drawer.Navigator>
   
  );
}
