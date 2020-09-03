import React from "react"
import {View,Text,SafeAreaView} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import HomeInterface from "../Components/HomeInterface"
import CatalogInterface from "../Components/CatalogInterface"
import LikedInterface from "../Components/LikedInterface"
import ProfileInterface from "../Components/ProfileInterface"
import SearchInterface from "../Components/SearchInterface"
import OfferItem from "../Components/OfferItem"
import LoginScreen from "../Components/SignInScreen"
import MyHomeStack from "./StackNavigator"
import MySearchStack from "./SearchNavigator"
import ProfileRouter from "./profileRouter"

const Tab =  createMaterialTopTabNavigator();

function TabNavigator()
{
  return (
    <>
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>
      <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
      tabBarPosition:"bottom",
       activeTintColor: '#FF4500',
       inactiveTintColor:"grey",
       showLabel:true,
       labelStyle:{fontSize:10,textTransform:"capitalize"},

       style:{backgroundColor:"black"},
       indicatorStyle:{height:0},
       showIcon:true
     }}>
         <Tab.Screen name="Home" component={MyHomeStack}
         options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }} />



         <Tab.Screen name="Liked" component={LikedInterface}
         options={{
          tabBarLabel: 'Liked',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={24} />
          ),
        }}/>

         <Tab.Screen name="Search" component={MySearchStack}
         options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cloud-search" color={color} size={24} />
          ),
        }}/>
         <Tab.Screen name="Profile" component={ProfileRouter}  options={{
           tabBarLabel: 'Profile',
           activeBackgroundColor: "red",
           tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="face-profile" color={color} size={24} />
           ),
         }}/>
       </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
    </>
  )
}

export default TabNavigator
