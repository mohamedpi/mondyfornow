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
  Dimensions,PixelRatio,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Actions} from 'react-native-router-flux';
import { material } from 'react-native-typography';

var jwtDecode = require('jwt-decode');
var FONT_BACK_LABEL   = 20;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 30;
}
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SignUpScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    state = {
      name:'',
      avatar:'',
      email: '',
      password: '',
      userId: '',
      success: false,
    };
  }

  onClickListener = (viewId) => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

goHome(){
  Actions.HomeInterface();

}


goSignIn(){
  Actions.SignIn();
}
  //   async register() {
  //    const res= await axio.post('http://192.168.1.109:8082/user/login', {
  //       email: this.state.email,
  //       password: this.state.password,
  //     });
  //     if (res.success){
  //         var decoded = jwt_decode(token);

  //         this.setState({success:true, userId:decoded._id});

  //     }
  // if (this.state.success){
  //     Alert.alert("success",'welcome');
  // }
  // else{
  //     Alert.alert("no",'nonono');

  // }
  //   }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <View style={{height: screenHeight * 0.08}}></View>
            <View>
            <Text style={material.display1}>Sign Up</Text>
            </View>
            <View style={{height: screenHeight * 0.08}}></View>
            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="user"
                size={screenWidth * 0.08}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Name"
                keyboardType="default"
                underlineColorAndroid="transparent"
                onChangeText={(name) => this.setState({name})}
              />
            </View>
            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="smileo"
                size={screenWidth * 0.08}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Avatar"
                keyboardType="default"
                underlineColorAndroid="transparent"
                onChangeText={(avatar) => this.setState({avatar})}
              />
            </View>
            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="mail"
                size={screenWidth * 0.08}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={(email) => this.setState({email})}
              />
            </View>

            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="key"
                size={screenWidth * 0.08}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={(password) => this.setState({password})}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.goHome()}>
              <Text style={styles.loginText}>Register</Text>
            </TouchableHighlight>

            <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' 
              style={styles.buttonContainer}
              onPress={() => this.goSignIn()}>
              <Text>Already have an account? Login here</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
});
