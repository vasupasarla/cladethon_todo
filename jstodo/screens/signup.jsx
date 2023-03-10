import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Text, Button } from "react-native"

import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'signup.db' });


export default function Signup({ navigation }) {
  const [show, setShow] = useState(true);

  const [t, setT] = useState(null);
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);

  // useEffect(() => {
  //   db.transaction((txn) => {
  //     txn.executeSql(
  //       "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
  //       [],
  //       (tx, res) => {
  //         console.log('item:', res.rows.length);
  //         if (res.rows.length == 0) {
  //           txn.executeSql('DROP TABLE IF EXISTS user', []);
  //           txn.executeSql(
  //             'CREATE TABLE IF NOT EXISTS user(pin VARCHAR(20))',
  //             []
  //           );
  //         }
  //       }
  //     );
  //   });
  // }, []);
  

  function signup() {
    if (p1 === p2) {

      //-----------------
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO user (pin) VALUES (?)',
          [p1],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            
          },
          error => {
            console.log(error);
          },
        );
      });

      //--------------------



      setT("Sign Up Successfully");
      navigation.navigate("Login")
    }
    else {
      setT("Password mismatch");

    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.colors}> Sign Up </Text>
        <Text style={styles.title}> Please enter 4 digit PIN </Text>
        <TextInput style={styles.border} onChangeText={val => setP1(val)} textAlign={"center"} secureTextEntry={show} letterSpacing={10} maxLength={4} placeholder="****" placeholderTextColor={"grey"} underlineColorAndroid="transparent" keyboardType={"number-pad"}></TextInput>
        <TextInput style={styles.border} onChangeText={val => setP2(val)} textAlign={"center"} secureTextEntry={show} letterSpacing={10} maxLength={4} placeholder="****" placeholderTextColor={"grey"} underlineColorAndroid="transparent" keyboardType={"number-pad"}></TextInput>
        <View style={{ "paddingTop": 10 }}>


          <View>
            <Text style={{ color: "black", fontSize: 15, paddingBottom: 30 }}> {show ? "SHOW" : "HIDE"}   <Icon name={show ? "eye" : "eye-slash"} size={25} color="black" onPress={() => { if (p1?.length || p2?.length) setShow(!show) }} /> </Text>
          </View>
          <Button
            onPress={signup}
            title="SIGN UP"
            color="green"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>


      {/* <View style={styles.v2}>
    <Text style={{color: (lg===password)? "green" : "red",  fontSize:20}}> {(lg?.length<=4 && lg)?err:null} </Text>
    </View> */}

      <View style={styles.v2}>
        <Text style={{ color: (p1 === p2) ? "green" : "red", fontSize: 20 }}> {t} </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: 10,
    color: "green"
  },

  v2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  container: {
    fontSize: 20,
    backgroundColor: "white",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    color: "black",
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 20,
    margin: 5,
    borderWidth: 1,
    height: 40,
    width: "50%",
    borderRadius: 30,
    // justifyContent:"center",
    // alignItems:"center"
  },
  colors: {
    fontSize: 100,
    paddingTop: "10%",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    fontSize: 30,
    paddingBottom: 20,
  }

})
