import React from "react"
import {View,Text,StyleSheet} from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import HomeInterface from "../Components/HomeInterface"
import OffersListInterface from "../Components/OffersListInterface"

const Stack = createStackNavigator();

export default function MyHomeStack() {
  return (
    <Stack.Navigator    screenOptions={{

        headerStyle: { backgroundColor: '#C0C0C0' },
      }}>
      <Stack.Screen name="Home" component={HomeInterface} options={{headerTitleStyle:styles.labelStyle} } />
      <Stack.Screen name="Offers" component={OffersListInterface} options={{headerTitleStyle:styles.labelStyle,headerTintColor:"#dce0e9"} } />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  labelStyle:{
    fontFamily:"GlueGun-GW8Z",
    fontSize:30,
    color:"black"
  }
})
