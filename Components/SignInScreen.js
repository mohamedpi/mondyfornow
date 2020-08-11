import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  Dimensions,
  PixelRatio,
  NativeModules,DeviceEventEmitter
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Actions} from 'react-native-router-flux';
import {material} from 'react-native-typography';
// import { TypingAnimation } from 'react-native-typing-animation';
import axios from 'axios';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import TouchID from 'react-native-touch-id' ;

var jwtDecode = require('jwt-decode');

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var FONT_BACK_LABEL = 20;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 30;
}

export default class LoginView extends Component {
  // static navigationOptions = {
  //   header: null,
  // };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      avatar: '',
      email: '',
      password: '',
      userId: '',
      success: false,
      // typing_email: false,
      // typing_password: false,
    };
  }
  // _focus(value){
  //   if(value=="email"){
  //     this.setState({
  //       typing_email: true,
  //       typing_password: false
  //     })
  //   }
  //   else{
  //     this.setState({
  //       typing_email: false,
  //       typing_password: true
  //     })
  //   }
  // }

  // _typing(){
  //   return(
  //     <TypingAnimation
  //       dotColor="black"
  //       style={{marginRight:25}}
  //     />
  //   )
  // }


_pressHandler() {
  

 TouchID.isSupported()
  .then(success => {
    // Success code
       console.log("supported");
  })
  .catch(error => {
    // Failure code
    console.log(error);
    Alert.alert('Device does not support touch ID')
  })
  
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        Alert.alert('Authenticated Successfully');
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
      });
  }


  goSignUp() {
    Actions.SignUp();
  }
  async goHome() {
    // console.warn(this.state.email + this.state.password)
    try {
      const res = await axios.post('http://192.168.1.109:8082/user/login', {
        // email: this.state.email,
        // password: this.state.password,
        email: 'ghjqssq',
        password: 'vghbjnk,l;',
      });
      console.log(res);
      if (res.status == 200) {
        var decoded = jwt_decode(token);

        // this.setState({success: true, userId: decoded._id});
        Actions.HomeInterface();
      }
      // if (this.state.success){
      //     Alert.alert("success",'welcome');
      //     Actions.HomeInterface();
      // }
      else {
        Alert.alert('no', 'nonono');
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <View style={{height: screenHeight * 0.08}}></View>
            <View>
              <Text style={material.display1}>Sign In</Text>
            </View>
            <View style={{height: screenHeight * 0.08}}></View>
            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="mail"
                size={screenWidth * 0.08}
              />
              <TextInput
                style={styles.inputs}
                onSubmitEditing={() => this.password.focus()}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={(email) => {
                  this.setState({email});
                }}
              />
              {this.state.typing_email ? this._typing() : null}
            </View>

            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="key"
                size={screenWidth * 0.08}
              />
              <TextInput
                ref={(password) => (this.password = password)}
                style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={(password) => this.setState({password})}
              />
              {this.state.typing_email ? this._typing() : null}
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.goHome()}>
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
             onPress={this._pressHandler}>
              <Text style={styles.loginText}>Login with fingerprint</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              style={styles.buttonContainer}
              onPress={() => this.goSignUp()}>
              <Text>Don't have an account? Sign Up here</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

//config is optional to be passed in on Android
const optionalConfigObject = {
  title: "Authentication Required", // Android
  color: "#e00606", // Android,
  fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: screenHeight * 0.2,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: FONT_BACK_LABEL,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
  icon: {
    marginLeft: screenWidth * 0.04,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 6,
    color: '#20232a',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

