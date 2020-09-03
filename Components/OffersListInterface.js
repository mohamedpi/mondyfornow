import React,{useEffect,useState} from "react"
import {View,Text,StyleSheet,Dimensions,SafeAreaView,Image,ScrollView,Alert,TouchableOpacity} from "react-native"
import { Button, ThemeProvider,Card,ListItem} from 'react-native-elements';
import Axios from "axios"


var width = Dimensions.get('window').width
var height = Dimensions.get("window").height

function OffersListInterface(props){
  const {game} = props.route.params
  const [offres,setOffres] = useState([])

  useEffect(()=>{
    async function getOffreById()
    {
    const response = await Axios.get( `http://192.168.43.173:8082/offer/offersById/${game._id}`)
    setOffres(response.data)
    }
    getOffreById()
  },offres)
  return(
     <>
        <SafeAreaView style ={styles.container}>
         <ScrollView>
            <View>
              <Image style ={styles.coverImage} source={{uri : game.imageURI }}/>
            </View>
            <View style = {styles.details}>
            <ListItem containerStyle ={styles.listItemContainer}
              key={4}
              leftAvatar={{
             source: require('../assets/details.jpg'),
             }}
             title=<Text style={styles.listItemTitle}>Details </Text>
             subtitle=<Text style={styles.listItemDes}>{game.description} </Text>
            />
            </View>
            <View style = {styles.offersContainer}>
            {offres.map(e =>(
              <View   key={e._id}  >
                 <TouchableOpacity  onPress={() =>props.navigation.navigate("OfferItem",{offer:e})}>
              <Card

                 containerStyle={styles.cardStyle}
                 imageStyle={styles.imageStyle}
                 image={{uri :e.imageURI}}>

             </Card>
             </TouchableOpacity>
             </View>
           ))}
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
