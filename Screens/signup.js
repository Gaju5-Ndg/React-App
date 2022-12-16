import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

export default function SignUpScreen(){
    const[names, setNames]= useState('');
    const[email, setEmail]= useState('');
    const[phonenumber, setPhonenumber]=useState('');
    const[password, setPassword]=useState('');
    const navigation=useNavigation('');
    const submitreg = async()=>{
        try{
           
          const res =await axios.post('http://192.168.43.177:5000/signup',{names, email,phonenumber,password})
          console.log("hello")
          console.log(res.data)
            }catch(error){
          console.log(error)
          console.log('error')
            }
       }
    return(
        <SafeAreaView style={{flex:1}}>
            <Ionicons 
onPress={()=>navigation.navigate("MainContainer")}
name="arrow-back-outline" size={40} color='black' style={{margin:20,position:'absolute'}}/>
        
<View style={styles.loginpage}>
    <Text style={{fontSize:30,fontWeight:"bold"}}>Bestir oneself with</Text>
    <Text style={{fontSize:18,fontWeight:"normal"}}> WarningApp</Text>

    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'}> 
<TextInput 
style={styles.input} 
placeholder="Enter Names"
name="names"
onChangeText={(text) => setNames(text)}/>
<TextInput 
style={styles.input} 
placeholder="Enter Email"
name="email"
onChangeText={(text) => setEmail(text)}
/>

<TextInput
 style={styles.input}
  placeholder="Enter phone number"
  name="phonenumber"
  onChangeText={(text) => setPhonenumber(text)}
  />

<TextInput 
style={styles.input} 
secureTextEntry={true} 
placeholder="create password"
name="password"
onChangeText={(text) => setPassword(text)}
/>


<TouchableOpacity style={styles.login}
onPress={submitreg}
>
    <Text style={{fontSize:20, padding:5}}>SignUp</Text>
</TouchableOpacity>

    <Text style={{color:"darkcyan",marginTop:20,paddingBottom:10}} 
    onPress={()=>navigation.navigate('Login')}>Already have account?</Text>

</KeyboardAvoidingView>


</View>
</SafeAreaView>


    )
}
const styles= StyleSheet.create(
    {
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
            left:"30%",           
            },
            
    }
)