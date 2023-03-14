import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastAndroid ,FlatList, Button, View, Text, StyleSheet, Pressable, SafeAreaView, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'todo.db' });


export default function Completed({navigation}) {

  const [data, setData] = useState([])

  
 useEffect(()=> {
  db.transaction(function (tx) {
    tx.executeSql(
      'SELECT * FROM todolist where isCompleted = ?',
      [1],
      (tx, results) => {
      let temp=[];
      for(let i=0; i<results.rows.length;++i) temp.push(results.rows.item(i))
      setData(temp.reverse());
      console.log("data===========",data);
      },
      error => {
        console.log(error);
      },
    );
});
 }, [data])


    
  return (
    
  <SafeAreaView style={{flex:1, backgroundColor:"black"}}>
   <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
      <View style={{backgroundColor:"grey", height:"auto", width:"100%", flex:1, flexDirection:"row", paddingLeft:10, paddingRight: 10}}>
        <View style={{flex:4,margin:5,justifyContent:"center"}}>
          <Text style={{ color:"white", fontSize:20}}>{item.title}</Text>
        </View>

        <View style={{flex:1, alignItems:"flex-end", justifyContent:"center"}}>
          <Icon size={30} name={item.isBookmarked ? "star" : "star-o"} color={item.isBookmarked ? "yellow" : "white"} />
        </View>
    </View>

    <View style={{alignItems:"flex-end", justifyContent:"center", backgroundColor:"grey", color:"white"}}> 
    <Text> {item.date} </Text>
  </View>
  </View>
      )}
      ItemSeparatorComponent={
        <View style={{height:1}}></View>
      }
        // contentContainerStyle={{paddingBottom:0}} 
        extraData={true}
        keyExtractor={(item, index) => item.id}
      />
    
  
   </SafeAreaView>
  
  )
}

const styles = StyleSheet.create({
   
});
