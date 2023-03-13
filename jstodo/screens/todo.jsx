import React , {useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, StyleSheet , SafeAreaView, Button} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import uuid from 'react-native-uuid';

import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'todo.db' });

export default function Todo({navigation}) {
  
  const [title, setTitle] = useState("");
  // let t = new Date();
  // let tt = t.getFullYear()+'/'+(t.getMonth()+1)+'/'+t.getDate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,10));//).toLocaleDateString()
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    //console.warn("d----------",date);
    setSelectedDate(date.toISOString().slice(0,10));
    //console.log("ddddddddddd",JSON.stringify(date));
    hideDatePicker();
  };

  return (
    <SafeAreaView>
  <View style={styles.sf}>
    <View style={styles.v1}>
      <Text style={styles.v1title}>ADD TASK</Text>
    </View>

<View style={styles.mod}>
    <View style={styles.v2}>
      <Text style={styles.v2title}> Title </Text>
      <View style={styles.border}>
      <TextInput maxLength={200} onChangeText={tit=> setTitle(tit)} numberOfLines={3} color="black" multiline placeholder='todo' placeholderTextColor={"grey"}></TextInput>
      </View>
    </View>

    <View style={{marginTop:25}}>
      <View style={{flexDirection:"row"}}>
      <Icon name="calendar" size={25} color={"black"} onPress={showDatePicker}/>
      <Text style={{color:"black", fontSize:20, fontWeight:"normal"}}>    {selectedDate}  </Text>
      </View>
      <DateTimePickerModal
          //date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
    </View>

    </View>
    <View style={styles.btn}>
        <Button color="black" onPress={()=> {
       if(title.length>0) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO todolist (id, title, date, isBookmarked, isCompleted) VALUES (?,?,?,?,?)',
          [uuid.v4(), title, selectedDate , 0, 0],
          (tx, results) => {
            console.log('ttrr Results', results.rowsAffected);
          
          },
          error => {
            console.log(error);
          },
        );
      });

          navigation.navigate("Welcome");
    }
          }} title="Done"/>
      
    </View>
    </View>
    </SafeAreaView>
    
    
  )
}

const styles = StyleSheet.create({
  btn : {
    flex:0.5,
    alignItems:'center',
    justifyContent:"center",
    paddingBottom:50
  },
  border : {
    marginTop:20,
    marginBottom:10,
    color:"black",
    borderWidth:1,
    height:60,
    width:300,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
  },
  sf: {
     backgroundColor:"#bfeff2",
     height:"78%",
     marginTop:"30%",
     marginLeft:"4%",
     marginRight:"4%",
     borderRadius:30

  },
  v1title : {
    fontSize:25,
    color : "black",
    fontWeight:'bold',
  },
  v1 : {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    paddingTop:5
  },
  v2 : {
    paddingTop:10,
    alignItems:"center"
  },
  v2title : {
    fontSize:20,
    fontWeight:'500',
    color : "black",

  },
  mod : {
    marginTop:-10,
    marginBottom:0,
    flex:2,
    alignItems:"center",
  }
})

