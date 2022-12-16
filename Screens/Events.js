import { useEffect, useState } from 'react'; 
import { Text, View, StyleSheet, Button, TouchableOpacity,FlatList,Alert,TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Stations.db'); 

export default function AssetExample({navigation}) {
  const [name,setName] = useState('');
  const [waterlevel,setLevel]=useState('');
  const [temperature,setTemp]=useState('');
  const [station,setStation]=useState([]);
  db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS station (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(225),waterlevel INTEGER, temperature INTEGER)'
    )
  });
  const newstation = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO station (name, waterlevel, temperature) values (?, ?, ?)', [name, waterlevel, temperature],
        (txObj, resultSet) =>{
           console.log('Successfully created');
           navigation.navigate('Home');
           
        })
    });
  }
  useEffect(()=>{
    viewstation();
  });
  const viewstation = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM station',null,
        (txObj, {rows:{_array}}) => setStation(_array)
      )
    });
  }

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

  const DeleteUpdate=(id,name,waterlevel,temperature)=>{
    Alert.alert(
      'Hello, Do you want to update selected Event or to delete it?',
      '',
      [
        { text: 'Delete', onPress: () =>{
          db.transaction(tx=>{
            tx.executeSql('DELETE FROM station WHERE id=?',[id],
            (txObj,resultSet)=>{
              if(resultSet.rowsAffected>0){
                console.log('Event deleted successfully');
              }
            }
            )
           })
        } },
        {
          text: 'Update',
          onPress:() =>{navigation.navigate('Update',{id,name,waterlevel,temperature})}
        },
        {
          text: "Cancel",
          onPress: () =>{
            navigation.navigate('Stations');
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
      <TouchableOpacity onPress={()=>DeleteUpdate(item.id,item.name,item.waterlevel,item.temperature)}>
      <Text style={{fontWeight:'bold',fontSize:24}}>Station name:{item.name}</Text>
      <Text style={{fontSize:18}}>water level:{item.waterlevel}</Text>
      <Text style={{fontSize:18}}>Temperature:{item.temperature}°C</Text>
      </TouchableOpacity>
    </View>
  );
};

  

return (
  <View style={styles.container}>
     <TextInput style={styles.input} placeholder="Station name" onChangeText={(text)=>setName(text)}></TextInput>
     <TextInput style={styles.input} placeholder="Water Level" keyboardType='numeric' onChangeText={(text)=>setLevel(text)}></TextInput>
     <TextInput style={styles.input} placeholder="Temperature"  keyboardType='numeric'  onChangeText={(text)=>setTemp(text)}></TextInput>
     <TouchableOpacity style={styles.login} onPress={newstation}>
  <Text style={{fontSize:20, padding:5}}>Add Station</Text>
</TouchableOpacity>
<FlatList
          data={station}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
  </View>
);
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
          width:120,
          height:40,
          borderRadius:10,
          position:'relative',
          top:10,
          alignItems:"center",
          marginLeft:30      
        },
        
}
)