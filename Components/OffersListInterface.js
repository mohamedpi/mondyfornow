import React from "react"
import {View,Text,StyleSheet,Dimensions,SafeAreaView,Image,ScrollView} from "react-native"
import { Button, ThemeProvider,Card,ListItem} from 'react-native-elements';

var width = Dimensions.get('window').width
var height = Dimensions.get("window").height

function OffersListInterface()
{
  return(
     <>
        <SafeAreaView style ={styles.container}>
         <ScrollView>
            <View>
              <Image style ={styles.coverImage} source ={require("../assets/uncharted4.jpg")}/>
            </View>
            <View style = {styles.details}>
            <ListItem containerStyle ={styles.listItemContainer}
              key={4}
              leftAvatar={{
             source: require('../assets/details.jpg'),
             }}
             title=<Text style={styles.listItemTitle}>Details </Text>
             subtitle=<Text style={styles.listItemDes}>offer generated idk when just fill the field tadan tada
             this is just decription hope this app continue to amuse you and descritption section anyways </Text>
            />
            </View>
            <View style = {styles.offersContainer}>

              <Card
                 containerStyle={styles.cardStyle}
                 imageStyle={styles.imageStyle}
                 image={require('../assets/dimond1.png')}>
               </Card>
               <Card
                  containerStyle={styles.cardStyle}
                  imageStyle={styles.imageStyle}
                  image={require('../assets/dimond2.png')}>
                </Card>
                <Card
                   containerStyle={styles.cardStyle}
                   imageStyle={styles.imageStyle}
                   image={require('../assets/dimond3.png')}>
                 </Card>
                 <Card
                    containerStyle={styles.cardStyle}
                    imageStyle={styles.imageStyle}
                    image={require('../assets/dimond4.jpg')}>
                  </Card>
            </View>
        </ScrollView>

        </SafeAreaView>
     </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#121419"
  },
  coverImage :{
   width:width,
   height:height*0.25,
   resizeMode : "stretch"
 },
  listItemTitle:{
     fontFamily:"GlueGun-GW8Z",
     fontSize:15,
     color:"#dce0e9"
   },
   listItemDes:{
     fontSize:12,
     color:"#dce0e9"
   },
   listItemContainer:{
     backgroundColor:"#121419"
   },
   price:{
       fontFamily:"GlueGun-GW8Z",
        fontSize:20,
        color:"#dce0e9"
   },
   details:{
     marginTop:10,
     marginBottom:10
   },
   cardStyle:{
     width:135,
     height:135,
     borderRadius:20

   },
   imageStyle:{
     width:135,
     height:135,
     resizeMode:"cover",
     borderRadius:20
   },
   offersContainer : {
     flex:1,
     flexDirection:"row",
     justifyContent:"space-between",
     flexWrap:"wrap"
   }
})
export default OffersListInterface
