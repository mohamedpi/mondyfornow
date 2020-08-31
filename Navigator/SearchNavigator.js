import React from "react"
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import SearchInterface from "../Components/SearchInterface"
import OffersListInterface from "../Components/OffersListInterface"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar, Accessory } from 'react-native-elements';
import OfferItem from "../Components/OfferItem"
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

export default function MySearchStack() {
  return (
    <Stack.Navigator    screenOptions={{

        headerStyle: { backgroundColor: '#181b20',shadowColor:"#181b20"},
      }}
      >
      <Stack.Screen name="Search" component={SearchInterface} options={{headerTitleStyle:styles.labelStyle,
        headerRight : () => {return(
          < View style={{flexDirection:"row",marginRight:10,justifyContent:"space-around"}}>

 <AntDesign
   name="shoppingcart"
   size={24} />

  </View> )}  }} />
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
  }
})
