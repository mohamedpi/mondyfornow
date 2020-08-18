import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Language from './profile/language'
import Profile from './ProfileInterface'
import Edit from './profile/EditProfile'
import SplashScreen from './AuthInterface'
import creditCard from './profile/creditCard'
import aboutUs from './profile/aboutUs'
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
        </Scene>
      </Router>
    );
  }
}
