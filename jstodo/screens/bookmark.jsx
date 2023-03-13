import React, { useEffect, useState } from 'react'
import { FlatList, Button, View, Text, StyleSheet, SafeAreaView, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'todo.db' });


export default function Completed({ navigation }) {

  const [data, setData] = useState([])


  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM todolist where isBookmarked = ?',
        [1],
        (tx, results) => {
          let temp = [];
          for (let i = 0; i < results.rows.length; ++i) temp.push(results.rows.item(i))
          setData(temp.reverse());
          console.log("data===========", data);
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
        renderItem={({ item }) => (

          <View style={{ flex:1, justifyContent: "center", backgroundColor: "grey", height: "auto", width: "100%", paddingLeft: 10, paddingRight: 10 }}>
            <View style={{flex:1, flexDirection:"row",justifyContent: "center"}}>
              <View style={{ flex: 1,justifyContent: "center" }}>
                <BouncyCheckbox
                  disabled
                  size={30}
                  isChecked={item.isCompleted}
                  fillColor="green"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "white" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={() => { }}
                />
              </View>


              <View style={{ flex: 3, margin: 5, justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 20 }}>{item.title}</Text>
              </View>

            </View>

            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center", backgroundColor: "grey", color: "white" }}>
              <Text> {item.date} </Text>
            </View>
          </View>

        )}
        ItemSeparatorComponent={
          <View style={{ height: 1 }}></View>
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
