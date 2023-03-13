import React , {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Pressable} from "react-native";
import {Swipeable} from "react-native-gesture-handler";
import EIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'todo.db' });
const bindb = openDatabase({ name: 'bin.db' });

export default function Itemz({data}) {
  const [book , setBook] = useState(data.isBookmarked);

  useEffect(()=> {
    
    bindb.executeSql(
      'CREATE TABLE IF NOT EXISTS bintodolist(id VARCHAR(40),title VARCHAR(250), date DATE, isBookmarked INTEGER)',
       [],
      () => { console.log('Table created successfully'); },
      error => { console.log(`SQL Error: ${error}`); }
    );
  }, []);
  
function del(id, title, date) {
  bindb.transaction(function (tx) {
    tx.executeSql(
      'INSERT INTO bintodolist (id, title, date) VALUES (?,?,?)',
      [id, title, date],
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
     renderLeftActions={leftActions} onSwipeableLeftOpen={()=> del(data.id, data.title, data.date)}> 
        <View style={{flex:1, flexDirection:"row", backgroundColor:"grey", height:"auto", width:"100%"}}>
            <View>
   
   
            </View>
            <View>
                <Text style={{fontSize:20, color:"white", margin:10}}>
                  {data.title}{"   "}
                  {data.date}
                </Text>
            </View>
            <Pressable onPress={()=> {bookm(data.id)}}  style={{height:"auto",justifyContent:"center", alignItems:"flex-end" }}>
              <Icon size={30} name={book ? "star" : "star-o"} color={book ? "yellow" : "white"} />
            </Pressable>
        </View>
 </Swipeable>  
    
  )
}
