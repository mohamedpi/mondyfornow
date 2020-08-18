import React from "react"
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import HomeInterface from "../Components/HomeInterface"
import OffersListInterface from "../Components/OffersListInterface"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar, Accessory } from 'react-native-elements';
import OfferItem from "../Components/OfferItem"


const Stack = createStackNavigator();

export default function MyHomeStack() {
  return (
    <Stack.Navigator    screenOptions={{

        headerStyle: { backgroundColor: '#181b20',shadowColor:"#181b20"},
      }}
      >
      <Stack.Screen name="Home" component={HomeInterface} options={{headerTitleStyle:styles.labelStyle,
        headerRight : () => {return(
          < View style={{flexDirection:"row",marginRight:10,justifyContent:"space-around"}}>
          <MaterialCommunityIcons name="text-search" color={"white"} size={25}   />
        <Avatar
        size ={30}
        containerStyle={{marginLeft: 20}}
        rounded
        source={{  uri:  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>
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
