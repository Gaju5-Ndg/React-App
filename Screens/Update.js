import React,{useEffect,useState} from "react";
import { Text,StyleSheet,TouchableOpacity,View,TextInput} from "react-native";

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Stations.db');
import { useNavigation } from "@react-navigation/native";

export default function UpdateData({route}){
    const navigation = useNavigation()
// const {id}=route.params.id;
// const {date}=route.params.date;
const[Uname,setName]=useState('')
const[Uwaterlevel,setWaterlevel]=useState('')
const[Utemperature,setTemperature]=useState('')
// console.log(name,date);

 const update=(id)=>{
    db.transaction((tx)=>{
     tx.executeSql("UPDATE station set name=?, waterlevel=?, temperature=? where id=?",
     [Uname,Uwaterlevel,Utemperature,id],
     (txObj,resultSet)=>{
         if(resultSet.rowsAffected>0){
            console.log('Update successfully');
            navigation.navigate('Stations');
         }

     }
     )
    })
}

return(
      <View style={styles.container}>
     
        <TextInput style={styles.input}  onChangeText={(text)=>setName(text)}>{route.params.name}</TextInput>
        <TextInput style={styles.input}  onChangeText={(text)=>setWaterlevel(text)}>{route.params.waterlevel}</TextInput>
        <TextInput style={styles.input}  onChangeText={(text)=>setTemperature(text)}>{route.params.temperature}</TextInput>
    

        <TouchableOpacity style={styles.login} onPress={() => update(route.params.id)}><Text style={{color:'white',fontWeight:'bold',fontSize:20,marginLeft:7,marginTop:-2,marginTop:10}}>Update</Text></TouchableOpacity>
     

    </View>
)
}

const styles= StyleSheet.create({
  loginpage:{
      flex:1,
      justifyContent:'center',
      alignItems: 'center',
  },
  input:{
      borderColor: '#556b2f',
      borderWidth:1,
      margin:10,
      width:300,
      height:40,
      borderRadius:10,
      textAlign:'center',
  },
  login:{
    borderWidth:1,
        borderColor:'white',
        backgroundColor:'#008b8b',
        width:90,
        height:40,
        borderRadius:10,
        position:'relative',
        top:10,
        alignItems:"center",
        marginLeft:30      
      },
      
}
)