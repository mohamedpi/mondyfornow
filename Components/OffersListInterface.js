import React from "react"
import {View,Text,StyleSheet,Dimensions,SafeAreaView,Image} from "react-native"

var width = Dimensions.get('window').width
var height = Dimensions.get("window").height

function OffersListInterface()
{
  return(
     <>
        <SafeAreaView>
            <View>
              <Image style ={styles.coverImage} source ={require("../assets/uncharted4.jpg")}/>
            </View>
        </SafeAreaView>
     </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  coverImage :{
   width:width,
   height:height*0.25,
   resizeMode : "stretch"
  }
})
export default OffersListInterface
