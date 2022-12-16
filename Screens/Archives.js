import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList,TouchableOpacity,Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import moment from 'moment';

const db = SQLite.openDatabase('EventsDatabase.db'); 

export default function AssetExample({route,navigation}) {
  const [events,setEvents]=useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    gettingDate();
    getEvents();
  }, [events]);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080',
          borderWidth:1,
          borderColor:'gray'
        }}
      />
    );
  };

  const getEvents = () =>{
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM events WHERE date<?',[currentDate],
        (txObj, {rows:{_array}}) => setEvents(_array)
        ) 
    })
  };

  const gettingDate=()=>{
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(
      date + '/' + month + '/' + year 
    );
  }

  const DeleteUpdate=(id,name,date)=>{
    Alert.alert(
      'Hello, Do you want tO delete this Event?',
      '',
      [
        { text: 'Delete', onPress: () =>{
          db.transaction(tx=>{
            tx.executeSql('DELETE FROM events WHERE id=?',[id],
            (txObj,resultSet)=>{
              if(resultSet.rowsAffected>0){
                console.log('Event deleted successfully');
              }
            }
            )
           })
        } },
        
       
        {
          text: "Cancel",
          onPress: () =>{
            navigation.navigate('Archives');
          },
          style: "cancel"
        }
      ],
      { cancelable: true }
      //clicking out side of alert will not cancel
    );
       
  }

  const listItemView = (item) => {
    return (
      <View
        key={item.id}
        ItemSeparatorComponent={listViewItemSeparator}
        style={{ backgroundColor: 'white', padding: 20, margin:2, borderRadius:5, width:'100%' }}>
        <TouchableOpacity onPress={()=>DeleteUpdate(item.id,item.name,item.date)}>
        <Text style={{fontWeight:'bold',fontSize:24}}>{item.name}</Text>
        <Text style={{fontSize:18}}>Due date:{item.date}</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={styles.container}>
    <FlatList
         data={events}
         keyExtractor={(item, index) => index.toString()}
         renderItem={({ item }) => listItemView(item)}
       />
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },
  datecards:{
      marginBottom:5,
      height:150,
      width:'100%',
      borderRadius:20
  },
  datePickerStyle: {
    width: 200,
    marginTop: 10,
  },
  input:{
    height:50,
    marginTop:20,
    color:'black',
    width:'97%',
    marginLeft:5,
    marginBottom:5,
  },
  Addbutton:{
    height:50,
    width:'15%',
    color:'white',
    backgroundColor:'#0d3b66',
    borderRadius:60,
    marginLeft:'70%',
    marginTop:-42,
  }
});