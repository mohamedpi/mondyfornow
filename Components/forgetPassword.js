import React, {Component, useCallback} from 'react';
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
  NativeModules,
  DeviceEventEmitter,
  AsyncStorage,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Actions} from 'react-native-router-flux';
import {material} from 'react-native-typography';
// import { TypingAnimation } from 'react-native-typing-animation';
import axios from 'axios';
// import FingerprintScanner from 'react-native-fingerprint-scanner';
import TouchID from 'react-native-touch-id';
import Names from '../fields.json';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';

var jwtDecode = require('jwt-decode');

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var FONT_BACK_LABEL = 20;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 30;
}
import {BackHandler} from 'react-native';

export default class LoginView extends Component {
  // static navigationOptions = {
  //   header: null,
  // };

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    // Alert.alert('COMPONENT DID MOUNT');
    this.props.navigation.goBack(null);
    return true;
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      email: '',
      success: false,
      emailCorrect: true,
      wrongMail: false,
      isVerified: true,
      emailSent: false,
    };
  }

  validateEmail(email) {
    var pattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    var re = new RegExp(pattern);
    return re.test(email);
  }

  async login(email, password) {
    if (!this.validateEmail(this.state.email)) {
      this.setState({wrongMail: true});
      return false;
    } else {
      this.setState({wrongMail: false});
    }
    try {
      const res = await axios.post(
        'http://192.168.1.37:8082/user/verifyEmail',
        {
          email: this.state.email,
        },
      );

      if (res.status == 200) {
        try {
          const resp = await axios.post(
            'http://192.168.1.37:8082/user/forget-password',
            {
              email: this.state.email,
            },
          );

          if (resp.status == 200) {
            this.setState({emailSent: true});
            Alert.alert(
              'An email has been sent with your password, please log in now',
            );
            Actions.SignIn();
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err.message);
      if (err.response.status == 401)
        this.setState({
          emailCorrect: false,
        });
      else if (err.response.status == 402) this.setState({isVerified: false});
      else console.log(err);
    }
  }

  async goHome() {
    if (!this.validateEmail(this.state.email)) {
      this.setState({wrongMail: true});
      return false;
    } else {
      this.setState({wrongMail: false});
    }
    this.login(this.state.email, this.state.password);
  }

  async forgotPassword() {}

  render() {
    const errorMail = 'Please write a correct mail address';
    const verifyMail = 'Please verify your mail address first ';
    const mailNotFound = 'We were unable to find a user with that email';
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <LinearGradient
              colors={['#4f7799', '#334e85', '#16265a']}
              style={styles.linearGradient}>
              <View style={{height: screenHeight * 0.08}}></View>
              <View>
                <Text style={styles.signInText}>
                  Please enter your email address
                </Text>
              </View>
              <View style={{height: screenHeight * 0.05}}></View>

              <Text style={{color: 'red'}}>
                {this.state.wrongMail ? errorMail : null}
              </Text>
              <Text style={{color: 'red'}}>
                {!this.state.isVerified ? verifyMail : null}
              </Text>
              <Text style={{color: 'red'}}>
                {!this.state.emailCorrect ? mailNotFound : null}
              </Text>
              <View style={styles.inputContainer}>
                <AntDesign
                  style={styles.icon}
                  name="mail"
                  size={screenWidth * 0.08}
                />

                <TextInput
                  style={
                    (styles.inputs,
                    {
                      borderColor: !this.state.emailCorrect ? 'red' : 'black',
                    })
                  }
                  onSubmitEditing={() => this.password.focus()}
                  placeholder={Names.SignIn.Email}
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={(email) => {
                    this.setState({email});
                  }}
                />
                {this.state.typing_email ? this._typing() : null}
              </View>

              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => {
                  this.goHome();
                }}>
                <Text style={styles.loginText}>Send</Text>
              </TouchableHighlight>
              {/* 
                             <TouchableHighlight
                               style={[
                                 styles.buttonContainer,
                                 styles.loginButton,
                               ]}
                               onPress={this._pressHandler}>
                               <Text style={styles.loginText}>
                                 {Names.SignIn.FingerPrint}
                               </Text>
                             </TouchableHighlight> */}
              <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                style={styles.buttonContainer}
                onPress={() => this.goSignUp()}>
                <Text style={styles.noAccountText}>
                  {Names.SignIn.noAccount}
                </Text>
              </TouchableHighlight>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

//config is optional to be passed in on Android
const optionalConfigObject = {
  title: 'Authentication Required', // Android
  color: '#e00606', // Android,
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#dde4f0',
    backgroundColor: '#dde4f0',
    // borderRadius: 30,
    borderBottomWidth: 1,
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  linearGradient: {
    flex: 1,
  },
  inputs: {
    height: screenHeight * 0.2,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    fontSize: FONT_BACK_LABEL,
  },
  noAccountText: {
    color: 'white',
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
    alignSelf: 'center',
  },
  signInText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: '#218cf4',
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
