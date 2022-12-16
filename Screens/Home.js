import { useEffect, useState } from 'react'; 
import { Text, View, StyleSheet, Button, TouchableOpacity,Image,SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {Card, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
const db = SQLite.openDatabase('Stations.db'); 

export default function AssetExample({navigation}) {
  
  const [currentDate, setCurrentDate] = useState('');
  const [date, setDate] = useState('');
  const [name,setName]=useState('');

  useEffect(() => {
    
  }, []);


      db.transaction(tx => {
      tx.executeSql(
          'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(225), date VARCHAR(225))'
      )
    });
    const newevent = () => {
      db.transaction(tx => {
        tx.executeSql('INSERT INTO events (name, date) values (?, ?)', [name, date],
          (txObj, resultSet) =>{
             console.log('Successfully created');
             setName({value:''});
          })
      });

      //navigation.navigate('Events');
    }


    
 
  return (


    
    <View style={styles.container}>

      <Text style={styles.text}>Welcome To Our Flood System

      </Text>
     <Card style={styles.card}>
    <Text style={styles.te}>Big welcome to our Flood station mobile App </Text>
  </Card>
  <Card style={styles.card}>
    <Text style={styles.te}>This app let admins get to know more info about stations</Text>
  </Card>
  <Card style={styles.card}>
    <Text style={styles.te}>Experience the best features of this app</Text>
  </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
   
    justifyContent:'center',
    alignItems:'center'
  },
  card:{
    height:80,
    width:'94%',
    backgroundColor:'#006d77',
    margin:10,
    borderRadius:20,
  },
  cardOuter:{
    height:220,
    width:'100%',
    borderRadius:20,
    backgroundColor:'white'
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
  },
  over:{
    fontSize:18,
    fontWeight:'bold',
    padding:5,
  },
  text:{
 fontSize:18,
 fontWeight:'bold',

  },
  te:{
    padding:5,
    fontSize:20,
    textAlign:'center'
  }
});