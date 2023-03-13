import React from 'react'
import {View, Text, TouchableOpacity, Pressable} from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {Swipeable} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/EvilIcons';

const bindb = openDatabase({ name: 'bin.db' });

export default function Binitemz({data}) {

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

   
function del(id) {
  console.warn(data)
    bindb.executeSql("DELETE FROM bintodolist WHERE id = ?", [id], ()=> {
      console.log("Deleted");
    }, (error)=> {
      console.log(error);
    })
  }
  

    return (
        <Swipeable leftThreshold={100} leftActionActivationDistance={100}
         renderLeftActions={leftActions} onSwipeableLeftOpen={()=> del(data.id)}> 
            <View style={{flex:1, flexDirection:"row", backgroundColor:"grey", height:"auto", width:"100%", paddingLeft:10, paddingRight: 10}}>
                <View style={{justifyContent:"center", flex:1}}>
                <BouncyCheckbox
                    disabled
                    size={30}
                    isChecked={data.isCompleted}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "white" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={() =>{}}
                />
       
                </View>
                <View style={{flex:3}}>
                    <Text style={{fontSize:20, color:"white", margin:5}}>
                      {data.title}
                    </Text>
                </View>
                <Pressable  style={{flex:1,height:"auto",justifyContent:"center", alignItems:"flex-end" }}>
                  <Icon size={30} name={data.isBookmarked ? "star" : "star-o"} color={data.isBookmarked ? "yellow" : "white"} />
                </Pressable>
            </View>
            
            <View style={{alignItems:"flex-end", justifyContent:"center", backgroundColor:"grey", color:"white"}}> 
              <Text> {data.date} </Text>
            </View>
     </Swipeable>  
        
      )
}
