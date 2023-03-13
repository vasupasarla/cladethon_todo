import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastAndroid ,FlatList, Button, View, Text, StyleSheet, Pressable, SafeAreaView, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import Itemz from "./itemz";

import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'todo.db' });


function Todolist({navigation}) {

  const [data, setData] = useState([])
  
    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS todolist(id VARCHAR(40),title VARCHAR(250), date DATE, isBookmarked INTEGER, isCompleted INTEGER)',
          );
      }, null, null, null);
      fetchData();
    }, [data]);
  
 function fetchData() {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM todolist',
        [],
        (tx, results) => {
        let temp=[];
        for(let i=0; i<results.rows.length;++i) temp.push(results.rows.item(i))
        setData(temp);
        console.log("data===========",data);
        },
        error => {
          console.log(error);
        },
      );
  });
}


    
  return (
    
    <SafeAreaView>
   <FlatList
        data={data}
        renderItem={({item}) => (
        <Itemz data={item}/>
  )}
        ItemSeparatorComponent={
          <View style={{height:1}}></View>
        }
        // contentContainerStyle={{paddingBottom:0}} 
        // numColumns={4}
        // columnWrapperStyle={{ marginHorizontal: 1 }}
        extraData={true}
        keyExtractor={(item, index) => item.id}
      />
    

    <Pressable >
    <TouchableNativeFeedback>
    <View style={styles.ic}>
  <Icon onPress={()=> navigation.navigate("Todo")} name='plus' size={30} color='#01a699' style={{position: 'absolute', zIndex: 99}} />  
</View>
</TouchableNativeFeedback>
    </Pressable>
  
   </SafeAreaView>
  
  )
}

const styles = StyleSheet.create({
    ic: {
        color:"white",
        position:'static',
        justifyContent:'center',
        alignItems:'center',
        width:50,
        height:50,
        backgroundColor:'green',
        borderRadius:80/2,

        
        left:313,
        bottom:10,

}
});

export default Todolist;