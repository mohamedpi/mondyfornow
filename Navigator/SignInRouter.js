import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from '../Components/HomeInterface'
import LoginScreen from '../Components/LoginScreen'
import TabNavigator  from "./TabNavigator"
import SignUpScreen from "../Components/SignUpScreen"

export default class SignInRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true} >
          <Scene key="LoginScreen" component={LoginScreen } title="Login" />
          <Scene key="HomeNavigator" component={TabNavigator} title="Home" />
          <Scene key="SignUpScreen" component={SignUpScreen} title="Home" />
        </Scene>
      </Router>
    );
  }
}
