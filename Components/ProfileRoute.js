import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Profile from './ProfileInterface';
import Edit from './EditProfileScreen';
// import History from './'
export default class Route extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true} >
          <Scene key="Profile" component={Profile} title="Profile" initial={true} />
          <Scene key="Edit" component={Edit} title="Edit Profile" />
          {/* <Scene key="History" component={History} title="Search history" /> */}
        </Scene>
      </Router>
    );
  }
}
