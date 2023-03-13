import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList, Button, View, Text, StyleSheet, SafeAreaView, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'todo.db' });


export default function Completed({navigation}) {

  const [data, setData] = useState([])

  
 useEffect(()=> {
  db.transaction(function (tx) {
    tx.executeSql(
      'SELECT * FROM todolist where isBookmarked = ?',
      [1],
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
 }, [data])


    
  return (
    
  <SafeAreaView>
   <FlatList
        data={data}
        renderItem={({item}) => (
        <View style={{backgroundColor:"grey"}}>
          <Text style={{color:"white"}}> {item.title} {"   "}  {item.date}</Text>
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
