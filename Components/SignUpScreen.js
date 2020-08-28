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
  Animated,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Actions} from 'react-native-router-flux';
import {material} from 'react-native-typography';
import ImagePicker from 'react-native-image-picker';
// import Icon from 'react-native-icons'
import Names from '../fields.json';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';

var jwtDecode = require('jwt-decode');
var FONT_BACK_LABEL = 20;

if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 30;
}
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class SignUpScreen extends Component {
                 static navigationOptions = {
                   header: null,
                 };
                 constructor() {
                   super();
                   this.state = {
                     name: '',
                     avatar: '',
                     email: '',
                     password: '',
                     userId: '',
                     wrongMail:false,
                     confirmPassword: true,
                     passVisible: true,
                     passConfirmVisible: true,
                     photo: null,
                     success: false,
                     indicator: new Animated.Value(0),
                     wholeHeight: 1,
                     visibleHeight: 0,
                   };
                 }
                 validateEmail(email) {
                   var pattern =
                     '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
                   var re = new RegExp(pattern);
                   return re.test(email);
                 }
                 onClickListener = (viewId) => {
                   Alert.alert('Alert', 'Button pressed ' + viewId);
                 };

                 goHome() {
                   Actions.HomeInterface();
                 }

                 goSignIn() {
                   Actions.SignIn();
                 }

                 async register() {
                   //  let uri = this.state.photo.uri;

                   //let filename = uri.split('/').pop();
                   //console.log(filename);
                   //formData.append('userImage', {
                   //uri: this.state.photo.uri,
                   //type: this.state.photo.type,
                   //name: this.state.photo.fileName,
                   //});

                       if (!this.validateEmail(this.state.email)) {
                         this.setState({wrongMail: true});
                         return false;
                       } else {
                         this.setState({wrongMail: false});
                       }

                 if(this.state.wrongMail==false&&this.state.confirmPassword==true)
                       {  try {
                     const resp = await axios.post(
                       'http://192.168.1.37:8082/user/register',
                       {
                         email: this.state.email,
                         password: this.state.password,
                         avatar: this.state.avatar,
                         name: this.state.name,
                       },
                     );
                     if (resp.status == 200) {
                       Alert.alert("Please confirm your email before logging in");
                       Actions.SignIn();
                     }
                   } catch (error) {
                     console.log(error);
                   }}
                   else if(this.state.confirmPassword==false){
                     Alert.alert("Please confirm your password first")
                   }
                 }

                 /*  takePic() {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('response', response);

      if (response.uri) {
        this.setState({photo: response});
      }
    });
  }*/

                 render() {
                                      const errorMail =
                                        'Please write a correct mail address';

                   // const {photo} = this.state;
                   const indicatorSize =
                     this.state.wholeHeight > this.state.visibleHeight
                       ? (this.state.visibleHeight * this.state.visibleHeight) /
                         this.state.wholeHeight
                       : this.state.visibleHeight;

                   const difference =
                     this.state.visibleHeight > indicatorSize
                       ? this.state.visibleHeight - indicatorSize
                       : 1;

                   return (
                     <SafeAreaView style={styles.container}>
                       <ScrollView
                         showsVerticalScrollIndicator={false}
                         onContentSizeChange={(width, height) => {
                           this.setState({wholeHeight: height});
                         }}
                         onLayout={({
                           nativeEvent: {
                             layout: {x, y, width, height},
                           },
                         }) => this.setState({visibleHeight: height})}
                         scrollEventThrottle={16}
                         onScroll={Animated.event([
                           {
                             nativeEvent: {
                               contentOffset: {y: this.state.indicator},
                             },
                           },
                         ])}>
                         <LinearGradient
                           colors={['#4f7799', '#334e85', '#16265a']}
                           style={styles.linearGradient}>
                           <View style={styles.container}>
                             <View style={{height: screenHeight * 0.08}}></View>
                             <View>
                               <Text style={styles.signInText}>
                                 {Names.SignUp.SignUp}
                               </Text>
                             </View>
                             <View style={{height: screenHeight * 0.08}}></View>
                             <Text style={{color: 'red', marginLeft: 10}}>
                               {this.state.wrongMail ? errorMail : null}
                             </Text>
                             <View style={styles.inputContainer}>
                               <AntDesign
                                 style={styles.icon}
                                 name="user"
                                 size={screenWidth * 0.08}
                               />
                               <TextInput
                                 style={styles.inputs}
                                 placeholder={Names.SignUp.Name}
                                 keyboardType="default"
                                 underlineColorAndroid="transparent"
                                 onSubmitEditing={() => this.avatar.focus()}
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
                                 ref={(avatar) => (this.avatar = avatar)}
                                 placeholder={Names.SignUp.Avatar}
                                 keyboardType="default"
                                 onSubmitEditing={() => this.email.focus()}
                                 underlineColorAndroid="transparent"
                                 onChangeText={(avatar) =>
                                   this.setState({avatar})
                                 }
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
                                 ref={(email) => (this.email = email)}
                                 placeholder={Names.SignUp.Email}
                                 onSubmitEditing={() => this.password.focus()}
                                 keyboardType="email-address"
                                 underlineColorAndroid="transparent"
                                 onChangeText={(email) =>
                                   this.setState({email})
                                 }
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
                                 ref={(password) => (this.password = password)}
                                 placeholder={Names.SignUp.Password}
                                 onSubmitEditing={() =>
                                   this.confirmPassword.focus()
                                 }
                                 secureTextEntry={this.state.passVisible}
                                 underlineColorAndroid="transparent"
                                 onChangeText={(password) =>
                                   this.setState({password})
                                 }
                               />

                               {this.state.passVisible ? (
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

                             <View style={styles.inputContainer}>
                               <AntDesign
                                 style={styles.icon}
                                 name="Safety"
                                 size={screenWidth * 0.08}
                                 color={
                                   !this.state.confirmPassword ? 'red' : 'black'
                                 }
                               />
                               <TextInput
                                 style={styles.inputs}
                                 placeholder="Confirm password"
                                 ref={(confirmPassword) =>
                                   (this.confirmPassword = confirmPassword)
                                 }
                                 secureTextEntry={this.state.passConfirmVisible}
                                 underlineColorAndroid="transparent"
                                 onChangeText={(password) => {
                                   console.log(password);
                                   if (password !== this.state.password)
                                     this.setState({confirmPassword: false});
                                   else this.setState({confirmPassword: true});
                                 }}
                               />

                               {this.state.passConfirmVisible ? (
                                 <Icon
                                   size={24}
                                   color="black"
                                   type="font-awesome-5"
                                   name="eye"
                                   onPress={() =>
                                     this.setState({
                                       passConfirmVisible: !this.state
                                         .passConfirmVisible,
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
                                       passConfirmVisible: !this.state
                                         .passConfirmVisible,
                                     })
                                   }></Icon>
                               )}
                             </View>

                             <TouchableHighlight
                               style={[
                                 styles.buttonContainer,
                                 styles.loginButton,
                               ]}
                               onPress={() => this.register()}>
                               <Text style={styles.loginText}>
                                 {Names.SignUp.SignUp}
                               </Text>
                             </TouchableHighlight>

                             <TouchableHighlight
                               underlayColor="rgba(73,182,77,1,0.9)"
                               style={styles.buttonContainer}
                               onPress={() => this.goSignIn()}>
                               <Text style={styles.noAccountText}>
                                 {Names.SignUp.withAccount}
                               </Text>
                             </TouchableHighlight>
                             <View style={{height: screenHeight * 0.08}}></View>
                           </View>
                         </LinearGradient>
                       </ScrollView>
                     </SafeAreaView>
                   );
                 }
               }

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
    borderBottomWidth: 1,
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  noAccountText: {
    color: 'white',
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
  signInText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 40,
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
  linearGradient: {
    flex: 1,
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
});
