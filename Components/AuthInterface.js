import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import SplashScreen from './SplashScreen';
import * as Animatable from 'react-native-animatable';
import AwesomeButton from 'react-native-really-awesome-button';
// import { createStackNavigator } from '@react-navigation/stack';
import {Actions} from 'react-native-router-flux';



const image = require('../assets/logo.jpg');
const cover = require('../assets/cover.jpg');
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SignInInterface extends Component {



  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <SplashScreen />
        </View>
        <Animatable.View animation="shake" style={styles.footer}>
          <View>
            <AwesomeButton
              style={styles.SignInButton}
              type="primary"
              backgroundColor="#3282b8"
              width={screenWidth * 0.8}
              height={screenHeight * 0.07}
              backgroundShadow="#3282b8"
              backgroundDarker="#3282b8"
              onPress={() => {
                Actions.SignIn();
              }}>
              Sign in
            </AwesomeButton>
        
            <View style={{height: screenHeight * 0.01}}></View>

            <AwesomeButton
              style={styles.SignInButton}
              type="primary"
              backgroundColor="#3282b8"
              width={screenWidth * 0.8}
              height={screenHeight * 0.07}
              backgroundProgress="#bbe1fa"
              backgroundShadow="#3282b8"
              backgroundDarker="#3282b8"
              onPress={() => {
                Actions.SignUp();
              }}>
              Sign up
            </AwesomeButton>
            <View style={{height: screenHeight * 0.01}}></View>

            <AwesomeButton
              style={styles.SignInButton}
              progress
              backgroundColor="#0f4c75"
              width={screenWidth * 0.8}
              height={screenHeight * 0.07}
              backgroundProgress="#bbe1fa"
              backgroundShadow="#3282b8"
              backgroundDarker="#3282b8"
              onPress={() => {}}>
              Sign in with Facebook
            </AwesomeButton>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

//style :
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b262c',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: 'rgba(225, 223, 223, 0.69)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: screenHeight * 0.1,
  },
 
  SignInButton: {
    alignSelf: 'center',
  },
});
