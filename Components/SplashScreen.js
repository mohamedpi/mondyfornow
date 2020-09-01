import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import {Dimensions, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
// const switchToAuth = () => {
//     Actions.replace('auth')
// };
import {BackHandler} from 'react-native';

export default class SplashScreen extends Component {
  state = {
    logoAnimation: new Animated.Value(0),
    textAnimation: new Animated.Value(0),
    // loadingSpinner: false,
  };
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    console.log('out');
  }

  async handleBackButtonClick() {
    Alert.alert(
      'Exit the app?',
      'Are you sure you want to exit the app?',

      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
  }

  async componentDidMount() {
         try {
      const isLogged = await AsyncStorage.getItem('isLogged');

    const {logoAnimation, textAnimation} = this.state;
    Animated.parallel([
      Animated.spring(logoAnimation, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 2000,
        useNativeDriver: false,
      }).start(),

      Animated.timing(textAnimation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // this.setState({
      //     loadingSpinner: true,
      // });
    setTimeout(() => {
      if (isLogged == 1) Actions.SignIn();
      else Actions.SignIn();
    }, 1500);
    });
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  catch(error){
    console.log(error)
  }
}

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            
            opacity: this.state.logoAnimation,
            top: this.state.logoAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          }}>
          <Image style={styles.logo} source={require('../assets/logo.png')} />
          {/* {this.state.loadingSpinner ? (
                    <ActivityIndicator
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        size="large"
                        color="#5257f2"
                    />
                ) : null} */}
        </Animated.View>
        <Animated.View
          style={{
            opacity: this.state.textAnimation,
          }}></Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#162447',
    flex: 1,
    alignSelf:'center'
  },
  logoText: {
    color: 'white',
    fontSize: 25,
    fontFamily: '', //import some fonts,
    alignSelf: 'center',
  },
  logo: {
    width: screenWidth,
    height: screenHeight*0.7,
    alignSelf:"center",
    alignItems:"center",
    position:"relative"
  },
});
