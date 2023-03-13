import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList, Button, View, Text, StyleSheet, Pressable, SafeAreaView, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import EIcon from 'react-native-vector-icons/EvilIcons';

import { openDatabase } from 'react-native-sqlite-storage';
const bindb = openDatabase({ name: 'bin.db' });


export default function Bin({navigation}) {

  const [data, setData] = useState([])
   
    function del() {
        bindb.transaction((tx) => {
            tx.executeSql('DELETE FROM bintodolist', [], (tx, results) => {
              console.log('All entries deleted');
            });
          });
    }

    useEffect(() => {
      bindb.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS bintodolist(id VARCHAR(40),title VARCHAR(250), date DATE, isBookmarked INTEGER)',     );
      }, null, null, null);
      fetchData();
    }, [data]);
  
  
 function fetchData() {
    bindb.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM bintodolist',
        [],
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
}


    
  return (
    
    <SafeAreaView>
    <Pressable style={{backgroundColor:"yellow", flexDirection:"row"}}>
      <TouchableNativeFeedback onPress={del}>
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
          <Text style={{color:"black", fontSize:20}}> Empty Bin <EIcon name='trash' size={30} color='black'/>  </Text>
          
        </View>
      </TouchableNativeFeedback>
    </Pressable>
  
   <FlatList
        data={data}
        renderItem={({item}) => (
        <View style={{backgroundColor:"grey", height:"auto", width:"100%"}}>
            <Text style={{color:"white"}}>
                {item.title}{"   "}{item.date}
            </Text>
        </View>
        )}
        ItemSeparatorComponent={
          <View style={{height:1}}></View>
        }
        extraData={true}
        keyExtractor={(item, index) => item.id}
      />
    
   </SafeAreaView>
  
  )
}

const styles = StyleSheet.create({
    ic: {
        float:"left",

}
});
