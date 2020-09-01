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
import NamesFr from '../fieldsFR.json';
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
      name: '',
      avatar: '',
      email: '',
      password: '',
      userId: '',
      success: false,
      emailCorrect: true,
      passwordCorrect: true,
      wrongMail: false,
      wrongPass: false,
      isVerified: true,
      passVisible: true,
      language:"",
      res: 200,
      nbGames:0,
      liked:""
    };
  }
 
  _pressHandler() {
    TouchID.isSupported()
      .then((success) => {
        // Success code
        console.log('supported');
      })
      .catch((error) => {
        // Failure code
        console.log(error);
        Alert.alert('Device does not support touch ID');
      });

    TouchID.authenticate('Scan your finger ', optionalConfigObject)
      .then((success) => {
        // Alert.alert('Authenticated Successfully');
        Actions.HomeInterface();
      })
      .catch((error) => {
        Alert.alert('Authentication Failed');
      });
  }

  goSignUp() {
    Actions.SignUp();
  }
  validateEmail(email) {
    var pattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    var re = new RegExp(pattern);
    return re.test(email);
  }

 

  async login(email, password) {
    try {
      const res = await axios.post('http://192.168.1.40:8082/user/login', {
        email: email,
        password: password,
      });
      var token = res.data.token;
      var user = res.data.user;
      console.log(token);
      console.log(user);

      if (res.status == 200) {
        var decoded = jwtDecode(token);
        console.log(decoded);

        try {
          const resp = await axios.get(
            `http://192.168.1.40:8082/user/getUser/?id=${decoded._id}`,
          );
          this.setState({
            userName: resp.data.name,
            userEmail: resp.data.email,
            language:resp.data.language
            ,userId:resp.data._id,liked:resp.data.liked
          });
        } catch (error) {
          console.log(error);
        }

        try {
          const resp = await axios.get(
            'http://192.168.1.40:8082/games/countGames',
          );
this.setState({nbGames:resp.data.games});
console.log("state"+this.state.nbGames)
        } catch (error) {
          console.log(error);
        }

        try {
          await AsyncStorage.setItem('liked', this.state.liked);
          await AsyncStorage.setItem('userId', this.state.userId);
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('isLogged', '1');
          await AsyncStorage.setItem('userName', this.state.userName);
          await AsyncStorage.setItem('userEmail', this.state.userEmail);
          await AsyncStorage.setItem('userLanguage', this.state.language);
          await AsyncStorage.setItem('nbGames', this.state.nbGames.toString());
          await AsyncStorage.setItem('pushNotif', "true");
        } catch (error) {
          console.log(error);
        }
        Actions.HomeInterface();
      }
    } catch (err) {
      console.log(err.message);
      if (err.response.status == 400)
        this.setState({
          emailCorrect: false,
          passwordCorrect: false,
        });
      if (err.response.status == 401) this.setState({isVerified: false});
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

  async forgotPassword() {
    Actions.ForgotPassword();
  }

  render() {
    const error = 'Email or Password is wrong';
    const errorMail = 'Please write a correct mail address';
    const verifyMail = 'Please verify your mail address first ';
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <LinearGradient
              colors={['#4f7799', '#334e85', '#16265a']}
              style={styles.linearGradient}>
              <View style={{height: screenHeight * 0.08}}></View>
              <View>
                <Text style={styles.signInText}>{Names.SignIn.SignIn}</Text>
              </View>
              <View style={{height: screenHeight * 0.05}}></View>
              <Text style={{color: 'red'}}>
                {!this.state.emailCorrect ? error : null}
              </Text>
              <Text style={{color: 'red'}}>
                {this.state.wrongMail ? errorMail : null}
              </Text>
              <Text style={{color: 'red'}}>
                {!this.state.isVerified ? verifyMail : null}
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
              {/* <Text>{!this.state.passwordCorrect ? error : ''}</Text> */}
              <View style={styles.inputContainer}>
                <AntDesign
                  style={styles.icon}
                  name="key"
                  size={screenWidth * 0.08}
                />
                <TextInput
                  ref={(password) => (this.password = password)}
                  style={styles.inputs}
                  placeholder={Names.SignIn.Password}
                  secureTextEntry={this.state.passVisible}
                  underlineColorAndroid="transparent"
                  onChangeText={(password) => this.setState({password})}
                />
                {this.state.passVisible == true ? (
                  <Icon
                    size={24}
                    color="black"
                    type="font-awesome-5"
                    name="eye"
                    onPress={() =>
                      this.setState({
                        passVisible: !this.state.passVisible,
                      })
                    }></Icon>
                ) : (
                  <Icon
                    size={24}
                    color="black"
                    type="font-awesome-5"
                    name="eye-slash"
                    onPress={() =>
                      this.setState({
                        passVisible: !this.state.passVisible,
                      })
                    }></Icon>
                )}
              </View>
              <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                style={styles.buttonContainer}
                onPress={() => this.forgotPassword()}>
                <Text style={styles.noAccountText}>Forgot password?</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => {
                  this.goHome();
                }}>
                <Text style={styles.loginText}>{Names.SignIn.SignIn}</Text>
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
    fontSize: 40,
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
