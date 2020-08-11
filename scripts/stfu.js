const fs = require('fs');

const codeToObscure = /console.warn\([\s\S].*"Require cycle: "/;
const problemFilePath = './node_modules/metro/src/lib/polyfills/require.js';
const problemFileContent = fs.readFileSync(problemFilePath,'utf8');
fs.writeFileSync(problemFilePath,problemFileContent.replace(codeToObscure,'const noConsoleWarn = (""'),'utf8');


import React, {useState,useEffect} from "react"
import {View, Text,TouchableHighlight,Alert} from 'react-native'
//or import TouchID from 'react-native-touch-id'

export default class YourComponent extends React.Component {
constructor(){
  super();
  this.state={
    isSupported:false,
  }
}

  

  render() {
    return (
      <View><TouchableHighlight ><Text>Authenticate with Touch ID</Text></TouchableHighlight>
      </View>
    );
  }
};

