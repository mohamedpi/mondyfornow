import React from "react"
import {View,Text,Image,StyleSheet} from "react-native"


function ProfileInterface(){
  return(
    <>
       <View style={styles.container}>
          <Text style={styles.textStyle}>welcome to Profile page</Text>
       </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:0,
    backgroundColor:"#121419"
  },  textStyle:{
      paddingHorizontal:15,
      marginVertical:15,
      fontFamily:"GlueGun-GW8Z",
      fontSize:25,
      color:"#dce0e9"
    },
})

export default ProfileInterface
