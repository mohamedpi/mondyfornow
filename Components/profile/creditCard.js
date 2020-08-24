import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {Container, Content, Form, Text, View, H3} from 'native-base';
import {Actions} from 'react-native-router-flux';
import AntDesign from 'react-native-vector-icons/AntDesign';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Languages extends Component {
  goToProfile() {
    Actions.profile();
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            <Container style={styles.container}>
              <Content padder>
                <View style={{flex: 1, alignItems: 'center'}}></View>
                <Form>
                  <View style={{height: screenHeight * 0.04}}></View>
                  <H3 style={styles.profileHeaderStyles}>
                    Insert your credit card info
                  </H3>
                  <View style={{height: screenHeight * 0.08}}></View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Number"
                      keyboardType="default"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Type"
                      keyboardType="default"
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  <View style={styles.buttons}>
                    <TouchableHighlight
                      underlayColor="rgba(73,182,77,1,0.9)"
                      style={[styles.buttonContainer, styles.EditButton]}>
                      <Text style={styles.loginText}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor="rgba(73,182,77,1,0.9)"
                      style={[styles.buttonContainer, styles.CancelButton]}
                      onPress={(values) => this.cancel()}>
                      <Text style={styles.loginText}>Cancel</Text>
                    </TouchableHighlight>
                  </View>
                </Form>
              </Content>
            </Container>
          </ScrollView>
        </SafeAreaView>
      </View>
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
  profileHeaderStyles: {
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00b5ec',
  },
  textStyle: {
    paddingHorizontal: 15,
    marginVertical: 15,
    fontFamily: 'GlueGun-GW8Z',
    fontSize: 25,
    color: '#dce0e9',
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
  icon: {
    marginLeft: screenWidth * 0.04,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: screenWidth * 0.3,
    borderRadius: 30,
  },
  EditButton: {
    backgroundColor: '#00b5ec',
    alignSelf: 'flex-start',
  },

  CancelButton: {
    backgroundColor: '#00b5ec',
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
