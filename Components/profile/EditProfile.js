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
  AsyncStorage,
} from 'react-native';
import {Container, Content, Form, Text, View, H3} from 'native-base';
import {Actions} from 'react-native-router-flux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Languages extends Component {
  goToProfile() {
    Actions.profile();
  }
  async submit() {
    try {
      var id = await AsyncStorage.getItem('userId');
      var token = await AsyncStorage.getItem('token');

      try {
        //name
        const res = await axios({
          method: 'put',
          url: 'http://192.168.43.124:8082/profile/updateName',
          data: {_id: id, name: this.state.name},
          headers: {
            'auth-token': token,
          },
        });
        if (res.status == 200) {
          console.log('success name');
          this.setState({
            nameSuccess: true,
          });
        }
      } catch (error) {
        console.log(error + 'updateName');
      }
      //avatar
      try {
        const res = await axios({
          method: 'put',
          url: 'http://192.168.43.124:8082/profile/updateAvatar',
          data: {_id: id, avatar: this.state.avatar},
          headers: {
            'auth-token': token,
          },
        });
        if (res.status == 200) {
          console.log('success avatar');
          this.setState({
            avatarSuccess: true,
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 400) this.setState({avatarExists: true});
      }
      //email
      try {
        const res = await axios({
          method: 'put',
          url: 'http://192.168.43.124:8082/profile/updateEmail',
          data: {_id: id, email: this.state.email},
          headers: {
            'auth-token': token,
          },
        });
        if (res.status == 200) {
          console.log('successemail');
          this.setState({
            emailSuccess: true,
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) this.setState({emailExists: true});
      }
      //password
      try {
        const res = await axios({
          method: 'put',
          url: 'http://192.168.43.124:8082/profile/updatePassword',
          data: {_id: id, password: this.state.password},
          headers: {
            'auth-token': token,
          },
        });
        if (res.status == 200) {
          console.log('success');
          this.setState({passwordSuccess: true});
        }
      } catch (error) {
        if (error.response.status == 401) this.setState({passwordExists: true});
      }
      const done =
        this.state.passwordSuccess &&
        this.state.avatarSuccess &&
        this.state.nameSuccess &&
        this.state.emailSuccess;
      if (done) {
        try {
          if (this.state.name != '')
            await AsyncStorage.setItem('userName', this.state.name);
          if (this.state.email != '')
            await AsyncStorage.setItem('userEmail', this.state.email);
        } catch (error) {
          console.log(error);
        }

        Actions.profile();
      }
    } catch (error) {
      console.log(error + 'storage');
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      name: '',
      avatar: '',
      email: '',
      password: '',
      avatarExists: false,
      emailExists: false,
      passwordExists: false,
      nameSuccess: false,
      avatarSuccess: false,
      emailSuccess: false,
      passwordSuccess: false,
    };
  }
  render() {
    const avatarE = 'This avatar already exists';
    const emailE = 'This email already exists';
    const passwordE = 'This password is the same, please change it';
    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            <Container style={styles.container}>
              <Content padder>
                <View style={{flex: 1, alignItems: 'center'}}></View>
                <Form>
                  <View style={{height: screenHeight * 0.04}}></View>
                  <H3 style={styles.profileHeaderStyles}>Edit Profile</H3>
                  <View style={{height: screenHeight * 0.08}}></View>
                  {this.state.avatarExists ? (
                    <Text style={{color: 'red'}}>{avatarE}</Text>
                  ) : null}
                  {this.state.emailExists ? (
                    <Text style={{color: 'red'}}>{emailE}</Text>
                  ) : null}
                  {this.state.passwordExists ? (
                    <Text style={{color: 'red'}}>{passwordE}</Text>
                  ) : null}
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
                  <View style={styles.buttons}>
                    <TouchableHighlight
                      underlayColor="rgba(73,182,77,1,0.9)"
                      style={[styles.buttonContainer, styles.EditButton]}
                      onPress={() => this.submit()}>
                      <Text style={styles.loginText}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor="rgba(73,182,77,1,0.9)"
                      style={[styles.buttonContainer, styles.CancelButton]}
                      onPress={() => {
                        this.goToProfile();
                      }}>
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
