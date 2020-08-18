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
      photo: null,
      success: false,
      indicator: new Animated.Value(0),
      wholeHeight: 1,
      visibleHeight: 0,
    };
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
    
    let uri = this.state.photo.uri;
    let formData = new FormData();
    let filename = uri.split('/').pop();
    console.log(filename);
    formData.append('userImage', {
      uri: this.state.photo.uri,
      type: this.state.photo.type,
      name: this.state.photo.fileName,
    });
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('avatar', this.state.avatar);
    formData.append('name', this.state.name);

    const header = {
      Accept: 'application/json',
      'content-type': 'multipart/form-data',
    };
    fetch('http://192.168.1.213:8082/user/register', {
      method: 'POST',
      headers: header,
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => console.log(res))
      .catch((err) => console.log('err', err));
  }

  takePic() {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('response', response);

      if (response.uri) {
        this.setState({photo: response});
      }
    });
  }

  render() {
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
            {nativeEvent: {contentOffset: {y: this.state.indicator}}},
          ])}>
          <View style={styles.container}>
            <View style={{height: screenHeight * 0.08}}></View>
            <View>
              <Text style={material.display1}>{Names.SignUp.SignUp}</Text>
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
                placeholder={Names.SignUp.Name}
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
                placeholder={Names.SignUp.Avatar}
                keyboardType="default"
                underlineColorAndroid="transparent"
                onChangeText={(avatar) => this.setState({avatar})}
              />
            </View>
            <TouchableHighlight
              onPress={() => {
                this.takePic();
              }}>
              <View style={styles.inputContainer}>
                {this.state.photo != null ? (
                  // <Image
                  //   source={{uri: this.state.photo.uri}}
                  //   style={{width: 50, height: 50,borderRadius:39}}
                  // />
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign
                      style={styles.icon}
                      name="camerao"
                      size={screenWidth * 0.08}
                    />
                    <Text style={{alignSelf: 'center'}}>
                      {this.state.photo.fileName}
                    </Text>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <AntDesign
                      style={styles.icon}
                      name="camerao"
                      size={screenWidth * 0.08}
                    />
                    <Text style={{alignSelf: 'center'}}>
                      {Names.SignUp.Photo}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableHighlight>

            <View style={styles.inputContainer}>
              <AntDesign
                style={styles.icon}
                name="mail"
                size={screenWidth * 0.08}
              />
              <TextInput
                style={styles.inputs}
                placeholder={Names.SignUp.Email}
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
                placeholder={Names.SignUp.Password}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={(password) => this.setState({password})}
              />
            </View>

            <TouchableHighlight
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.register()}>
              <Text style={styles.loginText}>{Names.SignUp.SignUp}</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              style={styles.buttonContainer}
              onPress={() => this.goSignIn()}>
              <Text>{Names.SignUp.withAccount}</Text>
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
