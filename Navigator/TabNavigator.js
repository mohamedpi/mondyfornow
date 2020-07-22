import React from "react"
import {View,Text} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeInterface from "../Components/HomeInterface"
import CatalogInterface from "../Components/CatalogInterface"
import LikedInterface from "../Components/LikedInterface"
import ProfileInterface from "../Components/ProfileInterface"
import SearchInterface from "../Components/SearchInterface"

const Tab = createBottomTabNavigator();

function TabNavigator()
{
  return (
    <>
    <NavigationContainer>
      <Tab.Navigator
      tabBarOptions={{
       activeTintColor: 'red',
       TintColor:"white",
       showLabel:true,
       style:{backgroundColor:"black"}
     }}>
         <Tab.Screen name="Home" component={HomeInterface}
         options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} />

         <Tab.Screen name="Catalog" component={CatalogInterface}  options={{
           tabBarLabel: 'Catalog',
           tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="details" color={color} size={size} />
           ),
         }}/>

         <Tab.Screen name="Liked" component={LikedInterface}
         options={{
          tabBarLabel: 'Liked',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}/>

         <Tab.Screen name="Search" component={SearchInterface}
         options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cloud-search" color={color} size={size} />
          ),
        }}/>
         <Tab.Screen name="Profile" component={ProfileInterface}  options={{
           tabBarLabel: 'Profile',
           activeBackgroundColor: "red",
           tabBarIcon: ({ color, size }) => (
             <MaterialCommunityIcons name="face-profile" color={color} size={size} />
           ),
         }}/>
       </Tab.Navigator>
    </NavigationContainer>
    </>
  )
}

export default TabNavigator
