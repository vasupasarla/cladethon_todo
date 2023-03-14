import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect} from 'react'
import {View, TextInput, StyleSheet, Text, Button , Pressable} from "react-native"

import { openDatabase } from 'react-native-sqlite-storage';

export default function Login({navigation}) {
  let db = openDatabase({ name: 'signup.db' });

  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(true);
  const [pre, setPre] = useState(false);
  const [lg, setLg] = useState(null);
  const [err, setErr] = useState(null);
  const [pin, setPin] = useState(null);
    
  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS user(pin VARCHAR(20))',
              []
            );
          }
        }
      );
    });

    setLg("");
  }, []);

  useEffect(()=> {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT pin FROM user',
        [],
        (tx, results) => {
          console.log('Results', results.rows.item(0));
          setPin(results.rows.item(0));
        },
        error => {
          console.log(error);
        },
      );
    });
  }, 
  [lg])
  

  

  return (
    <>
    <View style={styles.container}>
        <Text style={styles.colors}> Enter Pin </Text>
        <Text style={styles.title}> Please enter 4 digit PIN </Text>
        
        <TextInput value={lg} clearTextOnFocus={true} style={styles.border} onChangeText={val => {setLg(val)}} textAlign={'center'} secureTextEntry={show} placeholder="****" letterSpacing={10}  placeholderTextColor={"grey"} maxLength={4} underlineColorAndroid="transparent" keyboardType={"number-pad"}></TextInput>
        
        <View>
          <Text style={{color:"black", fontSize:15, paddingTop:10}}> {show?"SHOW":"HIDE"}   <Icon name={show?"eye":"eye-slash"} size={25} color="black" onPress={() => { if(lg?.length) setShow(!show) }}/> </Text>
          
        </View>

        <View style={{"paddingTop":10}}>
        <Button
  onPress={() => {
    setRefresh(!refresh);
    
    //navigation.navigate('Welcome');  //for testing ..
    console.log("x--------",lg,pin?.pin);
    setPre(true);
    if(lg?.length<4)
    setErr("Please enter 4 digit pin");
    else if(lg===pin?.pin) {
      setLg("");
      setErr("Password Match")
      navigation.navigate('Welcome');
    }
    else
      setErr("Wrong Password");
  }
    }
  title="LOGIN"
  color="green"
  accessibilityLabel="Learn more about this purple button"
/>
</View>

    </View>
    <View style={styles.v2}>
    <Text style={{color: (lg===pin?.pin)? "green" : "red",  fontSize:20}}> {(lg?.length<=4 && lg && pre)?err:null} </Text>
    </View>
    

    <View style={styles.v2}> 
    <Button
  onPress={()=> {
    setLg("");
    setErr("")
     navigation.navigate('Signup')}}
  title="Sign up"
  color="grey"
  accessibilityLabel="Learn more about this purple button"
/>
    </View>
    </>
  )
}

const styles = StyleSheet.create({

  title: {
    paddingBottom:10,
    color: "green"
  },
    v2: {
      flex:0.7, 
      justifyContent:"center", 
      alignItems:"center",
      backgroundColor:"white",
    },

    container: {
        fontsize:20,
        backgroundColor:"white",
        flex: 3,
        justifyContent : "center",
        alignItems : "center",
    },
    border: {
      paddingTop:10,
      paddingBottom:5,
      color:"black",
      borderWidth:1,
      height:40,
      width:"50%",
      borderRadius:30,
      justifyContent:"center",
      alignItems:"center"
    },
    colors: {
      paddingTop:"30%",
      color:"black",
      fontSize:30,
      paddingBottom:20,
    }
    
})
