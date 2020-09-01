import React,{useEffect,useState} from "react"
import {View,Text,StyleSheet,TouchableOpacity,AsyncStorage} from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import HomeInterface from "../Components/HomeInterface"
import OffersListInterface from "../Components/OffersListInterface"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar, Accessory,Badge } from 'react-native-elements';
import OfferItem from "../Components/OfferItem"
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from "axios"
import Modal from 'react-native-modal';
import {setVisibility} from "../actions/actions"
import {connect} from "react-redux"

const Stack = createStackNavigator();

function MyHomeStack(props) {
  const [user,setUser] = useState("")
  const [modalvisibility,setModalVisibility] = useState(false)
  const[panier,setPanier] = useState(0)

  const toggleModal = () => {
   setModalVisibility(!modalvisibility)
 };

  useEffect(()=>{
    async function fetchUser()
    {
      const id = await AsyncStorage.getItem('userId');
      const resp = await axios(`http://192.168.43.173:5000/user/getUser/${id}`)
      setUser(resp.data)
      setPanier(resp.data.panier.length)
    }

    fetchUser()

  },user.panier)
  return (
    <Stack.Navigator    screenOptions={{

        headerStyle: { backgroundColor: '#181b20',shadowColor:"#181b20"},
      }}
      >
      <Stack.Screen name="Home" component={HomeInterface} options={{headerTitleStyle:styles.labelStyle,
        headerRight : () => {return(
          < TouchableOpacity style={styles.shoppingCart} onPress={()=>props.setVisibility(true)}>

 <AntDesign
   name="shoppingcart"
   size={30}
   color={"white"} />
   <Badge
   status="primary"
   containerStyle={{ position: 'absolute', top: -4, right: -4 }}
   value={panier}
 />

  </TouchableOpacity> )}  }} />
      <Stack.Screen name="Offers" component={OffersListInterface} options={{headerTitleStyle:styles.labelStyle,headerTintColor:"white"} } />
        <Stack.Screen name="OfferItem" component={OfferItem} options={{headerTitleStyle:styles.labelStyle,headerTintColor:"white"} } />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  labelStyle:{
    fontFamily:"GlueGun-GW8Z",
    fontSize:30,
    color:"white"
  },
  shoppingCart:{
    marginRight:10
  }
})
export default connect(null,{setVisibility})(MyHomeStack)
