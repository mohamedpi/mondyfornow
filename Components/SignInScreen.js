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
  PixelRatio
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Actions} from 'react-native-router-flux';
import { material } from 'react-native-typography';
import { TypingAnimation } from 'react-native-typing-animation';

var jwtDecode = require('jwt-decode');

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

var FONT_BACK_LABEL   = 20;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 30;
}


export default class LoginView extends Component {
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
  onClickListener = (viewId) => {
    Alert.alert('Alert', 'Button pressed ' + viewId);
  };

goHome(){
  Actions.HomeInterface();
}


goSignUp(){
  Actions.SignUp();
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
                onSubmitEditing={()=>this.password.focus()}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={(email) => this.setState({email})}
                // onFocus={()=>this._focus("email")}
              />
               {/* {this.state.typing_email ?
                      this._typing()
                    : null} */}
            </View>

            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="key"
                size={screenWidth * 0.08}
              />
              <TextInput
              ref={(password) =>this.password=password}
                style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={(password) => this.setState({password})}
                // onFocus={()=>this._focus("password")}

              />
               {/* {this.state.typing_email ?
                      this._typing()
                    : null} */}
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.goHome()}>
              <Text style={styles.loginText}>Register</Text>
            </TouchableHighlight>

            <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' 
              style={styles.buttonContainer}
              
              onPress={
                () => this.goSignUp()
                }>
              <Text>Don't have an account? Sign Up here</Text>
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
    fontSize:FONT_BACK_LABEL,
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
  title:{
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 6,
    color: "#20232a",
    textAlign: "center",
    fontWeight: "bold",
  }
});
