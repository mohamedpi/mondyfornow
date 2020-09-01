import React,{useEffect,useState} from "react"
import {View,Text,Image,SafeAreaView,StyleSheet,ScrollView,TouchableOpacity,AsyncStorage} from "react-native"
import { Button, ThemeProvider,Card,ListItem} from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from "react-redux"
import {getGames} from "../actions/actions"
import {setVisibility} from "../actions/actions"
import Axios from "axios"
import Swiper from "react-native-swiper"
import StarRating from "./StarRating"
import Modal from 'react-native-modal';
import OfferItem from "./OfferItem"
//chebbitwo

function HomeInterface(props){
  const [user,setUser] = useState([{title:"fuck ou"}])



  useEffect(()=>{
    async function getData()
   {
    const response = await Axios.get("http://192.168.1.40:8082/games/show");
    props.getGames(response.data)
  }
  async function fetchUser()
  {
    const id = await AsyncStorage.getItem('userId');
    const resp = await axios(`http://192.168.1.40:8082/user/getUser/?id=${id}`)
    setUser(resp.data.panier)

  }
    fetchUser()
    getData()

 },props.games,user)

 return(
   <>
   <Modal isVisible={props.visible} coverScreen={true}>
          <View style={{flex: 1,backgroundColor:"white"}}>
            {user.map(item=>(
                <View>
                   <Text>{item.title}hey m</Text>
                </View>
              ))}
            <Button title="Hide modal" onPress={()=>props.setVisibility(false)} />

          </View>
    </Modal>
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
           <Text style={styles.textStyle}>check our new offers</Text>
        </View>
        <View>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
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
           </ScrollView>
           </View>
           <View>
                <Text style={styles.textStyle}>Discounts </Text>
             </View>

             <ListItem containerStyle ={styles.listItemContainer}
               key={1}
               leftAvatar={{
              source: require('../assets/dimond4.jpg'),
              }}
              title=<Text style={styles.listItemTitle}>Welcome</Text>
              subtitle=<Text style={styles.listItemDes}>offer generated at first signUp</Text>
              rightSubtitle=<Text style={styles.price}>45$</Text>
              bottomDivider
             />
             <ListItem containerStyle ={styles.listItemContainer}
               key={2}
               leftAvatar={{
              source: require('../assets/dimond3.png'),
              }}
              title=<Text style={styles.listItemTitle}>Lucky day</Text>
              subtitle=<Text style={styles.listItemDes}>offer generated on your birthday</Text>
              rightSubtitle=<Text style={styles.price}>40$</Text>
              bottomDivider
             />
             <ListItem containerStyle ={styles.listItemContainer}
               key={3}
               leftAvatar={{
              source: require('../assets/dimond2.png'),
              }}
              title=<Text style={styles.listItemTitle}>happy year</Text>
              subtitle=<Text style={styles.listItemDes}>offer generated idk when</Text>
              rightSubtitle=<Text style={styles.price}>25$</Text>
              bottomDivider
             />

      </ScrollView>
   </>
 )
}

const styles = StyleSheet.create({
 container:{
   flex:1,
   backgroundColor:"#121419"

 },
  textStyle:{
     paddingHorizontal:15,
     marginVertical:20,
     fontFamily:"GlueGun-GW8Z",
     fontSize:25,
     color:"gray",
     textAlign:"left"
   },
   cardStyle:{
   width:135,
   height:135,
   borderRadius:20

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
  }
})

const mapStateToProps = state =>({
  games : state.games,
  visible:state.visible
})

export default connect(mapStateToProps,{getGames,setVisibility})(HomeInterface)
