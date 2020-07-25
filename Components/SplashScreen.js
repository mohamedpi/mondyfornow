import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { Dimensions } from "react-native";
// import { Actions } from 'react-native-router-flux';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
// const switchToAuth = () => {
//     Actions.replace('auth')
// };

export default class SplashScreen extends Component {

    state = {
        logoAnimation: new Animated.Value(0),
        textAnimation: new Animated.Value(0),
        // loadingSpinner: false,
    }
    componentDidMount() {
        const { logoAnimation, textAnimation } = this.state;
        Animated.parallel([
            Animated.spring(logoAnimation, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1200,
                useNativeDriver: false,
            }).start(),

            Animated.timing(textAnimation, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,

            }),
        ]).start(
            () => {
            // this.setState({
            //     loadingSpinner: true,
            // });

            // setTimeout(switchToAuth, 1500);
        });
    }

    render() {
        return <View style={styles.container}>
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
                   <Animated.View style={{opacity: this.state.textAnimation}}>
         </Animated.View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#162447",
        flex: 1,
    },
    logoText: {
        color: "white",
        fontSize: 25,
        fontFamily: "",//import some fonts,
        alignSelf: "center"
    },
    logo: {
        width: screenWidth,
        height: screenHeight * 0.5,
    }
})