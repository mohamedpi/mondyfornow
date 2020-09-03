import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import SignUp from './SignUpRouter';
import SignIn from './LoginRouter';
import finger from '../Components/fingerprint'
import Auth from '../Components/AuthInterface'
import Splash from '../Components/SplashScreen';
import Home from './TabNavigator';

export default class Route extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="Splash" component={Splash} title="Auth" initial={true} />
          <Scene key="Auth" component={Auth} title="Auth" />
          <Scene key="SignIn" component={SignIn} title="Sign In" />
          <Scene key="SignUp" component={SignUp} title="Sign Up" />
          <Scene key="Home" component={Home} title="Home" />
        </Scene>
      </Router>
    );
  }
}
