import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from './TabNavigator';
import SignUp from './SignUpRouter';
import SignIn from '../Components/SignInScreen'
export default class Route extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true} >
          <Scene key="SignIn" component={SignIn} title="SignIn" initial={true} />
          <Scene key="HomeInterface" component={Home} title="Home" />
          <Scene key="SignUp" component={SignUp} title="Sign Up" />
        </Scene>
      </Router>
    );
  }
}
