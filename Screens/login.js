import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import axios from "axios";

export default function LoginScreen(){
const[email, setEmail]=useState();
const[password, setPassword]=useState(); 
const navigation=useNavigation();
const handleLogin = () => (
    
    fetch('http://192.168.43.177:5000/signin').then(
      res=>{return res.json()}
    ).then(data=>{
      var temp=[]
      data.map((R)=>{
        if(R.email==email && R.password== password){
          temp.push(R)
          console.log("hell")
        }
        }),
        //setItem(temp),
        console.log(temp)
        if(temp.length > 0){
          navigation.navigate("Stations")
        }else{
          Alert.alert("there is no account registered to this email")
        }  
        
        
    }).catch(
      (err)=> console.log(err)
    )
  )

    return(

<View style={styles.loginpage}>
    <Text style={{fontSize:30,fontWeight:"bold"}}>Bienvenue</Text>
    <Text style={{fontSize:18,fontWeight:"normal"}}>sur WarningApp</Text>

    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'}> 
<TextInput 
style={styles.input} 
placeholder="enter Email or username"
onChangeText={text => setEmail(text)}/>
<TextInput 
style={styles.input} 
secureTextEntry={true}
placeholder="enter your password"
onChangeText={text => setPassword(text)}
/>
<TouchableOpacity style={styles.login} onPress={handleLogin}>
    <Text style={{fontSize:20, padding:5}}>Login</Text>
</TouchableOpacity>

    <Text style={{color:"darkcyan",marginTop:20,paddingBottom:10}} onPress={()=>navigation.navigate('forget')}>Forgot your password?</Text>


    <Text style={{color:"darkcyan",}} onPress={()=>navigation.navigate('Signup')}>Don't have an Account?</Text>
</KeyboardAvoidingView>
</View>

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