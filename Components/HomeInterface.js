import React,{useEffect} from "react"
import {View,Text,Image,SafeAreaView,StyleSheet,ScrollView,TouchableOpacity} from "react-native"
import { Button, ThemeProvider,Card,ListItem} from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from "react-redux"
import {getGames} from "../actions/actions"
import Axios from "axios"
import Swiper from "react-native-swiper"
import StarRating from "./StarRating"


function HomeInterface(props){
  useEffect(()=>{
    async function getData()
   {
    const response = await Axios.get("https://galactech.herokuapp.com/games");
    props.getGames(response.data)
   }
   getData()
 })
 return(
   <>
      <ScrollView style={styles.container}>
         <View style ={styles.sliderContainer}>
          <Swiper autoplay horizontal={false} height={200} activeDotColor="#181b20">
          {props.games.map( item => {return(
            <TouchableOpacity  key={item._id} onPress={() =>props.navigation.navigate("Offers",{game:item})} style ={styles.slide}>
             <Image
                source={{uri: item.imageURI}}
                resizeMode ="cover"
                style={styles.sliderImage}
              />

             </TouchableOpacity>
          )}) }
          </Swiper>
          </View>
          <View>
                  <Text style={styles.textStyle}>Our partners </Text>
          </View>
          <View style ={styles.categroyContainer}>
               <Image source ={require("../assets/axiata.jpg")} style={styles.categoryIcon}/>
               <Image source ={require("../assets/Orange.jpg")} style={styles.categoryIcon}/>
               <Image source ={require("../assets/Turkcell.jpg")} style={styles.categoryIcon}/>
          </View >
          <View style ={styles.categroyContainer}>
               <Image source ={require("../assets/amazon.png")} style={styles.categoryIcon}/>
               <Image source ={require("../assets/dimond2.png")} style={styles.categoryIcon}/>
               <Image source ={require("../assets/dimond3.png")} style={styles.categoryIcon}/>
          </View >
          <View>
                  <Text style={styles.textStyle}>New Offers </Text>
          </View>
          <TouchableOpacity >
     <View style={styles.card}>
       <View style={styles.cardImgWrapper}>
         <Image
           source={require("../assets/logo.jpg")}
           resizeMode="cover"
           style={styles.cardImg}
         />
       </View>
       <View style={styles.cardInfo}>
         <Text style={styles.cardTitle}>title</Text>
         <StarRating ratings={5} reviews={"itemData.reviews"} />
         <Text numberOfLines={2} style={styles.cardDetails}>description</Text>
       </View>
     </View>
   </TouchableOpacity>
      </ScrollView>
   </>
 )
}

const styles = StyleSheet.create({
 container:{
   flex:1,
   backgroundColor:"white"

 },
  textStyle:{
     paddingHorizontal:15,
     marginVertical:20,
     fontFamily:"GlueGun-GW8Z",
     fontSize:25,
     color:"gray",
     textAlign:"center"
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
   categroyContainer:{
     flexDirection:"row",
     width:"90%",
     alignSelf:"center",
     marginTop:15,
     marginBottom:10,
     justifyContent:"space-around"
   },
   sliderImage:{
     height:"100%",
     width:"100%",
     alignSelf:"center",
     borderRadius:8
   },
   categoryBtn:{
     flex:1,
     width:"30%",
     marginHorizontal:0,
     alignSelf:"center"
   },
   categoryIcon:{
     borderWidth:0,
     alignItems:"center",
     justifyContent:"center",
     alignSelf:"center",
     width:70,
     height:70,
     backgroundColor:"#fdeae7",
     borderRadius:50,
     resizeMode:"cover"
   },
   categoryBtnTxt:{
     alignSelf:"center",
     marginTop:5,
     color:"#de4f35"
   },
   card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  }
})

const mapStateToProps = state =>({
  games : state.games
})

export default connect(mapStateToProps,{getGames})(HomeInterface)
