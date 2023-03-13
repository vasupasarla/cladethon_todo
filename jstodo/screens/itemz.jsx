import React , {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Pressable} from "react-native";
import {Swipeable} from "react-native-gesture-handler";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import EIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { openDatabase } from 'react-native-sqlite-storage';


const db = openDatabase({ name: 'todo.db' });
const bindb = openDatabase({ name: 'bin.db' });

export default function Itemz({data}) {
  const [book , setBook] = useState(data.isBookmarked);
  const [comp , setComp] = useState(data.isCompleted);

  useEffect(()=> {
    
    bindb.executeSql(
      'CREATE TABLE IF NOT EXISTS bintodolist(id VARCHAR(40),title VARCHAR(250), date DATE, isBookmarked INTEGER, isCompleted INTEGER)',
       [],
      () => { console.log('Table created successfully'); },
      error => { console.log(`SQL Error: ${error}`); }
    );
  }, []);
  
function del(id, title, date, isBookmarked, isCompleted) {
  bindb.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO bintodolist (id, title, date, isBookmarked, isCompleted) VALUES (?,?,?,?,?)',
      [id, title, date, isBookmarked, isCompleted],
      (tx, results) => {
        console.log('ttrr Results', results.rowsAffected);
      },
      error => {
        console.log(error);
      },
    );
  });

  db.executeSql("DELETE FROM todolist WHERE id = ?", [id], ()=> {
    console.log("Deleted");
  }, (error)=> {
    console.log(error);
  })
}

function bookm(id) {
  let v = book ? 0 : 1;
  setBook(v);
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE todolist SET isBookmarked = ? WHERE id = ?',
        [v, id],
        (tx, results) => {
          //console.warn('Rows book xxxxxxxxxx:', v, results.rowsAffected);
        },
        error => {
          console.warn("err",error);
        }
      );
    });
}

function compf(id) {
  let v = comp ? 0 : 1;
  setComp(v);
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE todolist SET isCompleted = ? WHERE id = ?',
        [v, id],
        (tx, results) => {
          console.warn('Rows book xxxxxxxxxx:', v, results.rowsAffected);
        },
        error => {
          console.warn("err",error);
        }
      );
    });
}


function leftActions() {
  // style={ {backgroundColor:"green",  justifyContent:"center" }
  return (<View style={{flex:1, height:"auto"}}>
    <TouchableOpacity style={{backgroundColor:"yellow"}}>
      <View style={{justifyContent:"center", height:"100%", width:"100%"}}>
        <EIcon size={35} color="red" name='trash'/>
      </View>
    </TouchableOpacity>
  </View>)
}

// //onSwipeableRightOpen={()=> {
//   console.log(dta)
//   del(data.id);
// }} c

  return (
    <Swipeable leftThreshold={125} leftActionActivationDistance={126}
     renderLeftActions={leftActions} onSwipeableLeftOpen={()=> del(data.id, data.title, data.date, data.isBookmarked, data.isCompleted)}> 
        <View style={{flex:1, flexDirection:"row", backgroundColor:"grey", height:"auto", width:"100%", paddingLeft:10, paddingRight: 10}}>
            <View style={{justifyContent:"center", flex:1}}>
            <BouncyCheckbox
                size={30}
                isChecked={!!comp}
                fillColor="green"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "white" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() => compf(data.id)}
            />
   
            </View>
            <View style={{flex:3}}>
                <Text style={{fontSize:20, color:"white", margin:5}}>
                  {data.title}
                </Text>
            </View>
            <Pressable onPress={()=> {bookm(data.id)}}  style={{flex:1,height:"auto",justifyContent:"center", alignItems:"flex-end" }}>
              <Icon size={30} name={book ? "star" : "star-o"} color={book ? "yellow" : "white"} />
            </Pressable>
        </View>
        
        <View style={{alignItems:"flex-end", justifyContent:"center", backgroundColor:"grey", color:"white"}}> 
          <Text> {data.date} </Text>
        </View>
 </Swipeable>  
    
  )
}
