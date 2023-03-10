import React, {useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList, Button, View, Text, StyleSheet, Pressable, SafeAreaView, TouchableNativeFeedback } from 'react-native'
import Card from "./card";


import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'todo.db' });


function Todolist({navigation}) {

  const [data, setData] = useState([])
    function addd() {
        
    }
    //useEffect(() => {
      if(1) {
      db.transaction((txn) => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='todolist'",
          [],
          (tx, res) => {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS todolist', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS todolist(id VARCHAR(40),title VARCHAR(250), date DATE, isBookmarked INTEGER)',
                []
              );
              console.log("vvvv")
            }
          }
        );
      });
  
  // useEffect(() => {

    // db.transaction((txn) => {
    //   // txn.executeSql(
    //   //   "SELECT name FROM sqlite_master WHERE type='table' AND name='todolist'",
    //   //   [],
    //   //   (tx, res) => {
    //   //     console.log('ccxitem:', res.rows.length);
    //   //     if (res.rows.length == 0) {
    //   //        txn.executeSql('DROP TABLE IF EXISTS todolist', []);
    //         txn.executeSql(
    //           'CREATE TABLE IF NOT EXISTS todolist(id VARCHAR(20), title VARCHAR(250), date DATETIME(), isBookmarked INTEGER)',
    //           []
    //         );
    //       }
    //     }
    //   );
    // });

    
    // db.transaction((txn) => {
    
    //         txn.executeSql(
    //           'CREATE TABLE IF NOT EXISTS todolist(id VARCHAR(20), title VARCHAR(250), date DATETIME(), isBookmarked INTEGER)'
    //         );
    // });

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
  //})
}

    
  return (
    
    <SafeAreaView>

    {/* <Button title='DK' onPress={dk}></Button> */}
   <FlatList
        data={data}
        renderItem={({item}) =>(

          <View style={{backgroundColor:"grey", height:60, margin:10}}>
            <Text color="black" style={{fontSize:20, color:"black"}}>{item.title}{""}{item.date}</Text>  
            <View> 
            
           </View>
           </View>    
          
        )}
        extraData={true}
        // numColumns={1}
        keyExtractor={(item, index) => item.id}
      />
    {/* <View>
      <Text> {data[0]?.title} </Text>
    </View> */}

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