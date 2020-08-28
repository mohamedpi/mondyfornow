import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Language from '../Components/profile/language'
import Profile from '../Components/ProfileInterface'
import Edit from '../Components/profile/EditProfile'
import SplashScreen from './AuthRouter'
import creditCard from '../Components/profile/creditCard'
import aboutUs from '../Components/profile/aboutUs'
import changePass from '../Components/profile/changePass'

export default class Route extends Component {

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="language" component={Language} title="Language" />
          <Scene
            hideNavBar={true}
            key="profile"
            component={Profile}
            title="Profile"
            initial={true}
          />
          <Scene key="Edit" component={Edit} title="Edit Profile" />
          <Scene
            key="Splash"
            component={SplashScreen}
            title="Auth"
            hideNavBar={true}
          />
          <Scene
            key="CreditCard"
            component={creditCard}
            title="Credit Card Info"
          />
          <Scene
            key="AboutUs"
            component={aboutUs}
            title="About Us"
          />
          <Scene
            key="changePass"
            component={changePass}
            title="Change password" 
          />
        </Scene>
      </Router>
    );
  }
}
