import React from "react"
import {View,Text,StyleSheet,Dimensions,Image,ImageBackground,Button,TouchableOpacity} from "react-native"






const image = require("../assets/logo.jpg")
const cover = require("../assets/cover.jpg")
const {height} = Dimensions.get("screen");
const {width}  = Dimensions.get("screen")
const height_logo = height * 0.28;


export default function ginInterface(props) {
  return (
    <View style={styles.container}>
           <View style = {styles.header}>
           <ImageBackground source ={cover}
            style={styles.logo}
           />
           </View>

        <View style = {styles.footer}>
              <Text style  = {styles.title}>Game Paradise enjoy</Text>
              <Text style  = {styles.text}>online gaming store</Text>

               <Button title="start" style ={styles.signIn}></Button>
        </View>
    </View>
  )
}

//style :
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#520F00'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomRightRadius:200


  },
  footer: {
      flex: 1,
      backgroundColor: '#2b001b',
      borderColor:"#fdd4bf",
      borderWidth:1,
      alignItems: 'center',



  },
  logo: {

   width: width,
   height: height,
   marginTop:height*0.2,


  },
  title: {
      paddingTop:20,
      color: '#fdd4bf',
      fontSize: 30,
      alignItems:"center",
      justifyContent:"center",
      fontFamily:"GlueGun-GW8Z"
  },
  text: {
      color:"#fdd4bf",
      alignItems:"center"
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      backgroundColor:"#fdd4bf",


  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  fblogin:{

    width : 200,
    height:30,
    marginTop:30

  },
  fbtext:{
    backgroundColor:"#fdd4bf",

    color :"black",
    textAlign:"center",
    fontFamily: "Cochin",
     fontWeight: "bold",
      fontSize: 15,




  }
});
