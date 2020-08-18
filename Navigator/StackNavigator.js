import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
import SignInScreen from "../Components/SignInScreen"
import SignUpScreen from "../Components/SignUpScreen"
import Auth from '../Components/AuthInterface'

export default function StackNavigator() {
  return (
      <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}