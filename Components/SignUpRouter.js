import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from '../Navigator/TabNavigator';
import SignUp from './SignUpScreen';
import SignIn from './LoginRouter'
export default class Route extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="SignUp" component={SignUp} title="SignUp" initial={true} />
          <Scene key="HomeInterface" component={Home} title="Home" />
          <Scene key="SignIn" component={SignIn} title="SignIn" />
        </Stack>
      </Router>
    );
  }
}
