import React,{useEffect,useState} from "react"
import {View,Text,Image,SafeAreaView,StyleSheet,ScrollView,TouchableOpacity,AsyncStorage} from "react-native"
import { Button, ThemeProvider,Card,ListItem,Avatar} from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from "react-redux"
import {setVisibility} from "../actions/actions"
import Axios from "axios"
import Swiper from "react-native-swiper"
import StarRating from "./StarRating"
import Modal from 'react-native-modal';
import OfferItem from "./OfferItem"
import AntDesign from 'react-native-vector-icons/AntDesign';
//chebbitwo

function HomeInterface(props){
  const [user,setUser] = useState([{title:"fuck ou"}])
  const [resp,setResp] = useState({
  games:[{
        name: "game name",
        details: "details",
        _id: "5f220a3bf311c848cc1fc6ff",
        offers: [
            {
                "id": "1",
                "imageURI": "https://vignette.wikia.nocookie.net/clashofclans/images/2/2b/Pileofgemsus.jpeg/revision/latest/top-crop/width/300/height/300?cb=20141125024724",
                "title": "first sign in",
                "description": "offre generated at first sign in clash of clans game",
                "date": "01-12-2020"
            },
            {
                "id": "2",
                "title": "winner",
                "imageURI": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYdZT6IWvpcXeJY8SwQavJvZz272Soy-4DDw&usqp=CAU",
                "description": "offre generated at  clash fo clans win",
                "date": "02-12-2020"
            }
        ],
        imageURI: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFaBiJNtAu6IbPRGk6Mr8xc1ChaxqKtrKxbQ&usqp=CAU",
        description: "this is clash of clans , a game that will amuse u , and it\"s related offers , feel free to buy the item you like ",
        date: "2020-01-19T23:00:00.000Z",
        rating: 9.9,
        offre: [],
        title: "clash of clans"
    }],
  newOffers:[{
        _id: "5f28313cc6526a10de5b04b8",
        imageURI: "https://previews.123rf.com/images/iuriimotov/iuriimotov1802/iuriimotov180200065/95134518-litecoin-crypto-currency-3d-isometric-physical-coins-digital-currency-golden-and-silver-coins-with-l.jpg",
        title: "ultimate discount",
        description: "this is a simple description of the offer",
        date: "2020-01-21T23:00:00.000Z",
        price: 4.3,
        gameID: "5f220a8bf311c848cc1fc701",
        discount: false,
        new: true
    }],
  discounts:[{
        _id: "5f28313cc6526a10de5b04b4",
        imageURI: "https://previews.123rf.com/images/iuriimotov/iuriimotov1802/iuriimotov180200065/95134518-litecoin-crypto-currency-3d-isometric-physical-coins-digital-currency-golden-and-silver-coins-with-l.jpg",
        title: "ultimate discount",
        description: "this is a simple description of the offer",
        date: "2020-01-21T23:00:00.000Z",
        price: 4.3,
        gameID: "5f220a8bf311c848cc1fc701",
        discount: true,
        new: false
    }],
    user:{
    "userImage": "gamePics/logo4.png",
    "liked": [],
    "panier": [{title:"",description:"",imageURI:"",price:""}],
    "isVerified": true,
    "language": "en",
    "_id": "5f52405023a2d941fc3892d9",
    "name": "faten3",
    "avatar": "faten2",
    "email": "faten2@gmail.com",
    "password": "$2a$10$uV.pXTj1inn3YKjFvMYPfemDr4AQZzW68cyvdQR913hnlEkGkr3QC",
    "createdAt": "2020-09-04T13:25:36.026Z",
    "updatedAt": "2020-09-05T05:36:07.140Z",
    "__v": 0
}
  })

const gamesURL = "http://192.168.43.173:8082/games/show"
const newOffersURL = "http://192.168.43.173:8082/offer/newOffers"
const discountsURL = "http://192.168.43.173:8082/offer/offerDiscount"
  useEffect(()=>{
     async function fetchData()
    {
      const getGames = await Axios.get(gamesURL)
      const getOffers =await  Axios.get(newOffersURL)
      const getDiscounts = await Axios.get(discountsURL)
      const id = await AsyncStorage.getItem('userId');
      const user = await Axios.get(`http://192.168.43.173:8082/user/getUser/?id=${id}`)


      //const newOffers = await Axios.get(newOffersURL)
    //  setResp({...resp,newOffers:newOffers})
      console.log("this is new games :" +  getGames.data +"this is newOffers : " + getOffers.data   +
      "this is discounts :"  +getDiscounts.data +"this is user:"+user)
      setResp({games:getGames.data,newOffers:getOffers.data,discounts:getOffers.data,user:user.data})
    }
     fetchData()
},[gamesURL,newOffersURL,discountsURL])

 return(
   <>
   <Modal isVisible={props.visible} coverScreen={true}>
       <ScrollView style={{flex: 1,backgroundColor:"#121419"}}>
         {resp.user.panier.map(item=>(
             <View>
             <ListItem containerStyle ={styles.listItemContainer}
               key={3}
              leftAvatar=<Avatar rounded source={{uri:item.imageURI}}/>
              title=<Text style={styles.listItemTitle}>{item.title}</Text>
              subtitle=<Text style={styles.listItemDes}>{item.description} only for <Text style ={styles.price}> {item.price}$ </Text></Text>
              rightSubtitle=<TouchableOpacity>
             <AntDesign
                name="close"
                color="red"
                size={20}
                onPress={() => {
                       Axios.put(`http://192.168.43.173:8082/games/removeFromCard/${resp.id}`,item)
                }}
              /></TouchableOpacity>
              bottomDivider
             />
             </View>
           ))}

           <View style={styles.buttonContainerModal}>
                    <Button title="purchase" onPress={()=>console.log("purchase")} />
                    <Button title="Hide modal" onPress={()=>props.setVisibility(false)} />
           </View>

       </ScrollView>
 </Modal>
      <ScrollView style={styles.container}>
         <View style ={styles.sliderContainer}>
          <Swiper autoplay horizontal={false} height={200} activeDotColor="#181b20">
          {  resp.games.map(item => ( <TouchableOpacity  key={item._id} onPress={() =>props.navigation.navigate("Offers",{game:item})} style ={styles.slide}>
             <Image
                source={{uri: item.imageURI}}
                resizeMode ="cover"
                style={styles.sliderImage}
              />

             </TouchableOpacity>
          )) }
          </Swiper>
          </View>
          <View>
           <Text style={styles.textStyle}>check our new offers</Text>
        </View>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>

              {

                  resp.newOffers.map((item,index) =>(
                <TouchableOpacity key={index} onPress={() =>props.navigation.navigate("OfferItem",{offer:item})}>
                  <Card
                     containerStyle={styles.cardStyle}
                     imageStyle={styles.imageStyle}
                     image={require('../assets/dimond4.jpg')}>
                   </Card>
                </TouchableOpacity>
              ))}


          </ScrollView>
          </View>
          <View>
                <Text style={styles.textStyle}>Discounts </Text>
             </View>
              {resp.discounts.map((item,index) =>( <TouchableOpacity onPress={() =>props.navigation.navigate("OfferItem",{offer:item})}>
                <ListItem containerStyle ={styles.listItemContainer}
                 key={index}
                 leftAvatar=<Avatar rounded source={{uri:item.imageURI}}/>
                title=<Text style={styles.listItemTitle}>{item.title}</Text>
                subtitle=<Text style={styles.listItemDes}>{item.description}</Text>
                rightSubtitle=<Text style={styles.price}>{item.price}$</Text>
                bottomDivider
               /></TouchableOpacity>))}


      </ScrollView>
   </>
 )
}

const styles = StyleSheet.create({
 container:{
   flex:1,
   backgroundColor:"#121419"

 },
 buttonContainerModal:{
   flex:1,
   flexDirection:"row",
   justifyContent:"space-between",
   marginTop:"20",
   color:"white"

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
       fontSize:15,
       color:"#dce0e9"
  }
})

const mapStateToProps = state =>({

  visible:state.visible,

})

export default connect(mapStateToProps,{setVisibility})(HomeInterface)
