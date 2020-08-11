import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import SignUp from './SignUpRouter';
import SignIn from './LoginRouter';
import finger from './fingerprint'
import Auth from './AuthInterface'
export default class Route extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true} >
          <Scene key="Auth" component={Auth} title="Auth" initial={true} />
          <Scene key="SignIn" component={SignIn} title="Sign In" />
          <Scene key="SignUp" component={SignUp} title="Sign Up" />
        </Scene>
      </Router>
    );
  }
}
