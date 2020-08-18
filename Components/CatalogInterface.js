import React from "react"
import {View,Text,Image,StyleSheet} from "react-native"
import Swiper from "react-native-swiper"


function CatalogInterface(){
  return(
    <>
       <View style={styles.container}>
          <View style ={styles.sliderContainer}>
           <Swiper autoplay horizontal={false} height={200} activeDotColor="#181b20">
               <View style ={styles.slide}>
                 <Image
                   source ={require("../assets/clashofclans.jpg")}
                   resizeMode ="cover"
                   style={styles.sliderImage}
                 />
                </View>
                <View style ={styles.slide}>
                  <Image
                    source ={require("../assets/cover.jpg")}
                    resizeMode ="cover"
                    style={styles.sliderImage}
                  />
                 </View>

           </Swiper>
           </View>
       </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
   textStyle:{
      paddingHorizontal:15,
      marginVertical:15,
      fontFamily:"GlueGun-GW8Z",
      fontSize:25,
      color:"#dce0e9"
    },
    sliderContainer:{
      height:200,
       width:"90%",
      marginTop:10,
      justifyContent:"center",
      alignSelf:"center",
      borderRadius:8,
    },
    wrapper:{},
    slide:{
      flex:1,
      justifyContent:"center",
      backgroundColor:"transparent",
      borderRadius:8
    },
    sliderImage:{
      height:"100%",
      width:"100%",
      alignSelf:"center",
      borderRadius:8
    }
})

export default CatalogInterface
